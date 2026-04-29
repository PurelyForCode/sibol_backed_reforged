import { IdGenerator } from '../../core/interfaces/IdGenerator'
import { TransactionManager } from '../../core/interfaces/TransactionManager'
import { Usecase } from '../../core/interfaces/Usecase'

export type CreateOrderCmd = {
    cartItemIds: string[]
    buyerId: string
    paymentMethod: string
}

export class CreateOrderUsecase implements Usecase<CreateOrderCmd, void> {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}
    async execute(cmd: CreateOrderCmd): Promise<void> {
        return await this.tm.transaction(async uow => {
            const cartRepo = uow.getCartRepo()
            const cartItemRepo = uow.getCartItemRepo()
            const orderRepo = uow.getOrderRepo()
        })
    }
}
