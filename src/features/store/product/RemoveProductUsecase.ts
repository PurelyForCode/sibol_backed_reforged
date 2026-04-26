import { Usecase } from '../../../core/interfaces/Usecase'
import { InternalServerError } from '../../../errors/InternalServerError'
import { ProductNotFoundException } from '../../../exceptions/products/ProductNotFoundException'
import { SellerHasNoStoreException } from '../../../exceptions/sellers/SellerHasNoStoreException'
import { SellerNotFoundException } from '../../../exceptions/sellers/SellerNotFoundException'
import { TransactionManager } from '../../../core/interfaces/TransactionManager'
import { FileManager } from '../../../core/interfaces/FileManager'
import { SellerStoreVerifier } from '../../../services/SellerStoreVerifier'

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

            const sellerStoreResolver = new SellerStoreVerifier(
                sellerRepo,
                storeRepo,
            )

            await sellerStoreResolver.verify(cmd.sellerId)
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
