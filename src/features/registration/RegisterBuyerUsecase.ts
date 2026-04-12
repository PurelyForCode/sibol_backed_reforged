import { IdGenerator } from '../../core/interfaces/IdGenerator'
import { PasswordUtil } from '../../core/interfaces/PasswordUtil'
import { TransactionManager } from '../../core/interfaces/TransactionManager'
import { EmailIsAlreadyUsedInAnotherAccount } from '../../exceptions/accounts/EmailIsAlreadyUsedInAnotherAccount'
import { Account } from '../../models/Account'
import { Buyer } from '../../models/Buyer'
import { Cart, CartStatus } from '../../models/Cart'

export type RegisterBuyerCmd = {
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    middleInitial: string
}

export class RegisterBuyerUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
        private readonly passwordHasher: PasswordUtil,
    ) {}

    async execute(cmd: RegisterBuyerCmd) {
        await this.tm.transaction(async uow => {
            const br = uow.getBuyerRepo()
            const ar = uow.getAccountRepo()
            const cr = uow.getCartRepo()

            const found = await ar.findByEmail(cmd.email)
            if (found) {
                throw new EmailIsAlreadyUsedInAnotherAccount(cmd.email)
            }

            const id = this.idGen.generate()
            const hashedPassword = await this.passwordHasher.hash(cmd.password)

            const now = new Date()
            const account = new Account(
                id,
                cmd.email,
                hashedPassword,
                now,
                now,
                null,
            )

            const buyer = new Buyer(
                id,
                null,
                cmd.username,
                cmd.firstName,
                cmd.lastName,
                cmd.middleInitial,
                false,
                true,
                now,
                now,
            )

            const cart = new Cart(buyer.id, CartStatus.ACTIVE)
            await ar.insert(account)
            await br.insert(buyer)
            await cr.insert(cart)
        })
    }
}
