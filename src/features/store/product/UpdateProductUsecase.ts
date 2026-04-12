import { Usecase } from '../../../core/interfaces/Usecase'
import { InternalServerError } from '../../../errors/InternalServerError'
import { ProductNameIsNotUniqueInStoreException } from '../../../exceptions/products/ProductNameIsNotUniqueInStoreException'
import { SellerHasNoStoreException } from '../../../exceptions/sellers/SellerHasNoStoreException'
import { SellerNotFoundException } from '../../../exceptions/sellers/SellerNotFoundException'
import { TransactionManager } from '../../../core/interfaces/TransactionManager'
import { ProductNotFoundException } from '../../../exceptions/products/ProductNotFoundException'
import { ProductImageNotFoundException } from '../../../exceptions/products/ProductImageNotFoundException'

export type UpdateProductCmd = {
    sellerId: string
    productId: string
    fields: Partial<{
        description: string | null
        name: string
        newThumbmailId: string
        availableStock: number
    }>
}

export class UpdateProductUsecase implements Usecase<UpdateProductCmd, any> {
    constructor(private readonly tm: TransactionManager) {}

    async execute(cmd: UpdateProductCmd): Promise<any> {
        return this.tm.transaction(async uow => {
            const productRepo = uow.getProductRepo()
            const sellerRepo = uow.getSellerRepo()
            const storeRepo = uow.getStoreRepo()
            const productImageRepo = uow.getProductImageRepo()

            const seller = await sellerRepo.findById(cmd.sellerId)
            if (!seller) {
                throw new SellerNotFoundException(cmd.sellerId)
            }
            if (!seller.storeId) {
                throw new SellerHasNoStoreException(cmd.sellerId)
            }

            // store validation
            const store = await storeRepo.findById(seller.storeId)
            if (!store) {
                throw new InternalServerError(
                    'Seller has a store but was not found in the database',
                )
            }
            store.assertIsUnbanned()

            const product = await productRepo.findById(cmd.productId)
            if (!product) {
                throw new ProductNotFoundException(cmd.productId)
            }

            if (cmd.fields.name) {
                if (
                    !(await productRepo.isProductNameUniqueInStore(
                        store.id,
                        cmd.fields.name,
                    ))
                ) {
                    throw new ProductNameIsNotUniqueInStoreException(
                        store.id,
                        cmd.fields.name,
                    )
                }
                product.name = cmd.fields.name
            }
            if (cmd.fields.newThumbmailId) {
                const oldThumbnail =
                    await productImageRepo.findThumbnailOfProduct(product.id)
                oldThumbnail.isThumbnail = false
                const newThumbnail = await productImageRepo.findById(
                    cmd.fields.newThumbmailId,
                )
                if (!newThumbnail) {
                    throw new ProductImageNotFoundException(
                        product.id,
                        cmd.fields.newThumbmailId,
                    )
                }
                newThumbnail.isThumbnail = true
                await productImageRepo.update(oldThumbnail)
                await productImageRepo.update(newThumbnail)
            }
            if (cmd.fields.description) {
                product.description = cmd.fields.description
            }
            if (cmd.fields.availableStock) {
                product.availableStock = cmd.fields.availableStock
            }
            await productRepo.update(product)
        })
    }
}
