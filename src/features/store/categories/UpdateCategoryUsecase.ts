import { Usecase } from '../../../core/interfaces/Usecase'
import { InternalServerError } from '../../../errors/InternalServerError'
import { SellerHasNoStoreException } from '../../../exceptions/sellers/SellerHasNoStoreException'
import { SellerNotFoundException } from '../../../exceptions/sellers/SellerNotFoundException'
import { TransactionManager } from '../../../core/interfaces/TransactionManager'
import { CategoryNameDuplicateException } from '../../../exceptions/categories/CategoryNameDuplicateException'
import { CategoryNotFoundException } from '../../../exceptions/categories/CategoryNotFoundException'

export type UpdateCategoryCmd = {
    sellerId: string
    categoryId: string
    name: string
}

export class UpdateCategoryUsecase implements Usecase<UpdateCategoryCmd, any> {
    constructor(private readonly tm: TransactionManager) {}

    async execute(cmd: UpdateCategoryCmd): Promise<any> {
        return this.tm.transaction(async uow => {
            const categoryRepo = uow.getCategoryRepo()
            const storeRepo = uow.getStoreRepo()
            const sellerRepo = uow.getSellerRepo()

            const seller = await sellerRepo.findById(cmd.sellerId)
            if (!seller) {
                throw new SellerNotFoundException(cmd.sellerId)
            }

            if (!seller.storeId) {
                throw new SellerHasNoStoreException(cmd.sellerId)
            }

            const store = await storeRepo.findById(seller.storeId)
            if (!store) {
                throw new InternalServerError(
                    'Seller has a store but was not found in the database',
                )
            }
            store.assertIsUnbanned()

            const category = await categoryRepo.findById(cmd.categoryId)
            if (!category) {
                throw new CategoryNotFoundException(cmd.categoryId)
            }
            if (category.name !== cmd.name) {
                category.name = cmd.name
            }
            await categoryRepo.update(category)
        })
    }
}
