import { Usecase } from '../../../core/interfaces/Usecase'
import { TransactionManager } from '../../../core/interfaces/TransactionManager'
import { SellerStoreVerifier } from '../../../services/SellerStoreVerifier'
import { ProductNotFoundException } from '../../../exceptions/products/ProductNotFoundException'
import { CategoryNotFoundException } from '../../../exceptions/categories/CategoryNotFoundException'
import { CategoryNotInStoreException } from '../../../exceptions/categories/CategoryNotInStoreException'
import { ProductAlreadyBelongsToCategoryException } from '../../../exceptions/products/ProductAlreadyBelongsToCategoryException'

export type AddProductToCategoryCmd = {
    sellerId: string
    productId: string
    categoryId: string
}

export class AddProductToCategoryUsecase implements Usecase<
    AddProductToCategoryCmd,
    any
> {
    constructor(private readonly tm: TransactionManager) {}

    async execute(cmd: AddProductToCategoryCmd): Promise<any> {
        return this.tm.transaction(async uow => {
            const productRepo = uow.getProductRepo()
            const storeRepo = uow.getStoreRepo()
            const sellerRepo = uow.getSellerRepo()
            const categoryRepo = uow.getCategoryRepo()

            const sellerStoreVerifier = new SellerStoreVerifier(
                sellerRepo,
                storeRepo,
            )
            const { store } = await sellerStoreVerifier.verify(cmd.sellerId)
            const product = await productRepo.findById(cmd.productId)
            if (!product) {
                throw new ProductNotFoundException(cmd.productId)
            }

            const category = await categoryRepo.findById(cmd.categoryId)
            if (!category) {
                throw new CategoryNotFoundException(cmd.categoryId)
            }
            if (category.storeId !== store.id) {
                throw new CategoryNotInStoreException(cmd.categoryId, store.id)
            }
            if (
                await categoryRepo.isProductInCategory(product.id, category.id)
            ) {
                throw new ProductAlreadyBelongsToCategoryException(
                    product.id,
                    category.id,
                )
            }

            await categoryRepo.addProductToCategory(product.id, category.id)
        })
    }
}
