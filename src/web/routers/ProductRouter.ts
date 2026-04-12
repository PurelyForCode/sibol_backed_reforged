import { Router } from 'express'
import { productController } from '../../compositionRoot'
import z from 'zod'
import { validateInput } from '../middleware/validateInput'
import { BaseUnitOfMeasurement } from '../../models/product/BaseUnit'
import { imageStorageMiddleware } from '../../config/Multer'
import { fakeSellerId } from '../../fakeIds'

export const productRouter = Router({ mergeParams: true })

const addProductSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(100),
        description: z.string().nullable(),
        baseUnit: z.enum(BaseUnitOfMeasurement.VALID_UNITS),
        // this is the name of the file that is meant to be the thumbnail
        thumbnailFileName: z.string(),
        sellUnits: z.array(
            z.object({
                conversionFactor: z.coerce.number().int().positive(),
                displayName: z.string().min(1).max(30),
                isDefault: z.stringbool(),
                price: z.coerce.number().int().positive(),
            }),
        ),
    }),
    params: z.object({
        storeId: z.uuidv7(),
    }),
})

productRouter.post(
    '/',
    imageStorageMiddleware.array(
        'images',
        Number.parseInt(process.env.MAXIMUM_PRODUCT_IMAGE_COUNT!),
    ),
    validateInput(addProductSchema),
    async (req, res, next) => {
        try {
            const { body, params } = req.validated as z.infer<
                typeof addProductSchema
            >
            const images: { path: string; isThumbnail: boolean }[] = []
            const multerImages = req.files as Express.Multer.File[]

            for (const multerImage of multerImages) {
                let isThumbnail = false
                if (multerImage.originalname === body.thumbnailFileName) {
                    isThumbnail = true
                }
                images.push({
                    path: multerImage.path,
                    isThumbnail,
                })
            }
            const sellUnits: {
                displayName: string
                price: number
                conversionFactor: number
                isDefault: boolean
            }[] = []
            for (const unit of body.sellUnits) {
                sellUnits.push(unit)
            }

            const result = await productController.addProduct({
                sellerId: fakeSellerId,
                description: body.description,
                name: body.name,
                baseUnit: body.baseUnit,
                images,
                sellUnits: sellUnits,
            })
            res.status(201).json({ data: result })
        } catch (error) {
            next(error)
        }
    },
)
