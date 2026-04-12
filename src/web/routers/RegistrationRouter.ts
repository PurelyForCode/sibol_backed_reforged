import { Router } from 'express'
import { RegisterSellerUsecase } from '../../features/registration/RegisterSellerUsecase'
import { registrationController } from '../../compositionRoot'
import z from 'zod'
import { validateInput } from '../middleware/validateInput'

export const registrationRouter = Router({ mergeParams: true })

const registerSellerSchema = z.object({
    body: z.object({
        email: z.email(),
        firstName: z
            .string()
            .min(1)
            .max(255)
            .transform(x => x.toLowerCase()),
        lastName: z
            .string()
            .min(1)
            .max(255)
            .transform(x => x.toLowerCase()),
        middleInitial: z
            .string()
            .max(10)
            .transform(x => x.toLowerCase()),
        password: z.string().min(8),
    }),
})

registrationRouter.post(
    '/seller',
    validateInput(registerSellerSchema),
    async (req, res, next) => {
        try {
            const { body } = req.validated as z.infer<
                typeof registerSellerSchema
            >
            const result = await registrationController.registerSeller({
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
                middleInitial: body.middleInitial,
                password: body.password,
            })
            res.status(201).json({ data: result })
        } catch (error) {
            next(error)
        }
    },
)
