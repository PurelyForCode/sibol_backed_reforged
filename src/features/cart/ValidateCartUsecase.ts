import { TransactionManager } from '../../core/interfaces/TransactionManager'
import { Usecase } from '../../core/interfaces/Usecase'
import { InternalServerError } from '../../errors/InternalServerError'
import { BuyerNotFoundException } from '../../exceptions/buyers/BuyerNotFoundException'
import { Store } from '../../models/Store'

export type ValidateCartCmd = {
    buyerId: string
}

export class ValidateCartUsecase implements Usecase<ValidateCartCmd, void> {
    constructor(private tm: TransactionManager) {}

    async execute(cmd: ValidateCartCmd): Promise<void> {
        return await this.tm.transaction(async uow => {
            const cartRepo = uow.getCartRepo()
            const cartItemRepo = uow.getCartItemRepo()
            const buyerRepo = uow.getBuyerRepo()
            const storeRepo = uow.getStoreRepo()

            const buyer = await buyerRepo.findById(cmd.buyerId)
            if (!buyer) {
                throw new BuyerNotFoundException(cmd.buyerId)
            }
            buyer.assertIsUnbanned()

            const cart = await cartRepo.findCartByBuyerId(cmd.buyerId)
            if (!cart) {
                throw new InternalServerError('Buyer exists but cart does not')
            }
            const items = await cartItemRepo.findAllByCartIdIncludeStoreId(
                cart.buyerId,
            )
            const stores = await storeRepo.findAllStoresByProductIds(
                items.map(x => x.cartItem.productId),
            )

            const storeMap = new Map<string, Store>()
            for (const store of stores) {
                storeMap.set(store.id, store)
            }

            for (const { cartItem, storeId } of items) {
                const store = storeMap.get(storeId)

                if (!store) {
                    cartItem.isValid = false
                    continue
                }

                if (store.bannedAt !== null) {
                    cartItem.isValid = false
                } else {
                    cartItem.isValid = true
                }
            }
            await cartItemRepo.updateAll(items.map(x => x.cartItem))
        })
    }
}
