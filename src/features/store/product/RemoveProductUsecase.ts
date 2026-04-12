import { Usecase } from '../../../core/interfaces/Usecase'
import { InternalServerError } from '../../../errors/InternalServerError'
import { ProductNotFoundException } from '../../../exceptions/products/ProductNotFoundException'
import { SellerHasNoStoreException } from '../../../exceptions/sellers/SellerHasNoStoreException'
import { SellerNotFoundException } from '../../../exceptions/sellers/SellerNotFoundException'
import { TransactionManager } from '../../../core/interfaces/TransactionManager'
import { FileManager } from '../../../core/interfaces/FileManager'

export type RemoveProductCmd = {
    sellerId: string
    productId: string
}

export class RemoveProductUsecase implements Usecase<RemoveProductCmd, any> {
    constructor(
        private readonly tm: TransactionManager,
        private readonly fileManager: FileManager,
    ) {}

    async execute(cmd: RemoveProductCmd): Promise<any> {
        return this.tm.transaction(async uow => {
            const productRepo = uow.getProductRepo()
            const productImageRepo = uow.getProductImageRepo()
            const storeRepo = uow.getStoreRepo()
            const sellerRepo = uow.getSellerRepo()

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
            const images = await productImageRepo.findAllByProductId(product.id)

            for (const image of images) {
                await this.fileManager.delete(image.url)
            }

            await productRepo.delete(product.id)
        })
    }
}
