import { TransactionManager } from '../../core/interfaces/TransactionManager'
import { Usecase } from '../../core/interfaces/Usecase'
import { InternalServerError } from '../../errors/InternalServerError'
import { BuyerNotFoundException } from '../../exceptions/buyers/BuyerNotFoundException'
import { CartItemNotFoundException } from '../../exceptions/carts/CartItemNotFoundException'

export type RemoveFromCartCmd = {
    buyerId: string
    cartItemId: string
}

export class RemoveFromCartUsecase implements Usecase<RemoveFromCartCmd, void> {
    constructor(private tm: TransactionManager) {}

    async execute(cmd: RemoveFromCartCmd): Promise<void> {
        return await this.tm.transaction(async uow => {
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

            const cartItem = await cartItemRepo.findById(cmd.cartItemId)
            if (!cartItem) {
                throw new CartItemNotFoundException(cmd.cartItemId)
            }
            await cartItemRepo.delete(cartItem.id)
        })
    }
}
