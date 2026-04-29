import { TransactionManager } from '../../core/interfaces/TransactionManager'
import { Usecase } from '../../core/interfaces/Usecase'
import { InternalServerError } from '../../errors/InternalServerError'
import { BuyerNotFoundException } from '../../exceptions/buyers/BuyerNotFoundException'
import { CartItemNotFoundException } from '../../exceptions/carts/CartItemNotFoundException'

export type UpdateCartItemCmd = {
    buyerId: string
    cartItemId: string
    fields: Partial<{
        quantity: number
    }>
}

export class UpdateCartItemUsecase implements Usecase<
    UpdateCartItemCmd,
    { cartItemId: string }
> {
    constructor(private tm: TransactionManager) {}

    async execute(cmd: UpdateCartItemCmd): Promise<{ cartItemId: string }> {
        return await this.tm.transaction(async uow => {
            const storeRepo = uow.getStoreRepo()
            const buyerRepo = uow.getBuyerRepo()
            const cartItemRepo = uow.getCartItemRepo()
            const cartRepo = uow.getCartRepo()

            const buyer = await buyerRepo.findById(cmd.buyerId)
            if (!buyer) {
                throw new BuyerNotFoundException(cmd.buyerId)
            }
            buyer.assertIsUnbanned()

            const cart = await cartRepo.findCartByBuyerId(buyer.id)
            if (!cart) {
                throw new InternalServerError('Buyer exists but has no cart')
            }

            const cartItem = await cartItemRepo.findOneByCartId(
                cmd.cartItemId,
                cart.buyerId,
            )
            if (!cartItem) {
                throw new CartItemNotFoundException(cmd.cartItemId)
            }

            const store = await storeRepo.findStoreByProductId(
                cartItem.productId,
            )
            if (!store) {
                throw new InternalServerError('Product exists but has no store')
            }
            if (store.bannedAt) {
                cartItem.isValid = false
            } else {
                if (cmd.fields.quantity) {
                    cartItem.quantity = cmd.fields.quantity
                }
            }
            await cartItemRepo.update(cartItem)
            return { cartItemId: cartItem.id }
        })
    }
}
