import { IdGenerator } from '../../core/interfaces/IdGenerator'
import { TransactionManager } from '../../core/interfaces/TransactionManager'
import { Usecase } from '../../core/interfaces/Usecase'
import { InternalServerError } from '../../errors/InternalServerError'
import { BuyerNotFoundException } from '../../exceptions/buyers/BuyerNotFoundException'
import { ProductNotFoundException } from '../../exceptions/products/ProductNotFoundException'
import { SellUnitNotFoundException } from '../../exceptions/sellUnits/SellUnitNotFoundException'
import { CartItem } from '../../models/CartItem'

export type AddToCartCmd = {
    buyerId: string
    productId: string
    quantity: number
    sellUnitId: string
}

export class AddToCartUsecase implements Usecase<
    AddToCartCmd,
    { storeId: string }
> {
    constructor(
        private tm: TransactionManager,
        private idGen: IdGenerator,
    ) {}

    async execute(cmd: AddToCartCmd): Promise<{ storeId: string }> {
        return await this.tm.transaction(async uow => {
            const productRepo = uow.getProductRepo()
            const sellUnitRepo = uow.getSellUnitRepo()
            const storeRepo = uow.getStoreRepo()
            const buyerRepo = uow.getBuyerRepo()
            const cartItemRepo = uow.getCartItemRepo()
            const cartRepo = uow.getCartRepo()

            const buyer = await buyerRepo.findById(cmd.buyerId)
            if (!buyer) {
                throw new BuyerNotFoundException(cmd.buyerId)
            }
            buyer.assertIsUnbanned()

            const product = await productRepo.findById(cmd.productId)
            if (!product) {
                throw new ProductNotFoundException(cmd.productId)
            }

            const sellUnit = await sellUnitRepo.findById(cmd.sellUnitId)
            if (!sellUnit || sellUnit.productId !== product.id) {
                throw new SellUnitNotFoundException(cmd.sellUnitId, product.id)
            }
            sellUnit.assertIsNotDiscontinued()

            const store = await storeRepo.findStoreByProductId(product.id)
            if (!store) {
                throw new InternalServerError('Product exists but has no store')
            }
            store.assertIsUnbanned()

            const cart = await cartRepo.findCartByBuyerId(buyer.id)
            if (!cart) {
                throw new InternalServerError('Buyer exists but has no cart')
            }

            const cartItem = new CartItem(
                this.idGen.generate(),
                cart.buyerId,
                product.id,
                sellUnit.id,
                cmd.quantity,
                true,
            )
            await cartItemRepo.insert(cartItem)
        })
    }
}
