import { Usecase } from '../../core/interfaces/Usecase'
import { EmailIsAlreadyUsedInAnotherAccount } from '../../exceptions/accounts/EmailIsAlreadyUsedInAnotherAccount'
import { Account } from '../../models/Account'
import { Seller } from '../../models/Seller'
import { IdGenerator } from '../../core/interfaces/IdGenerator'
import { PasswordUtil } from '../../core/interfaces/PasswordUtil'
import { TransactionManager } from '../../core/interfaces/TransactionManager'

export type RegisterSellerCmd = {
    email: string
    password: string
    firstName: string
    lastName: string
    middleInitial: string
}

export class RegisterSellerUsecase implements Usecase<RegisterSellerCmd, any> {
    constructor(
        private tm: TransactionManager,
        private passwordUtil: PasswordUtil,
        private idGen: IdGenerator,
    ) {}

    async execute(cmd: RegisterSellerCmd): Promise<{ sellerId: string }> {
        return await this.tm.transaction(async uow => {
            const sr = uow.getSellerRepo()
            const ar = uow.getAccountRepo()

            const found = await ar.findByEmail(cmd.email)
            if (found) {
                throw new EmailIsAlreadyUsedInAnotherAccount(cmd.email)
            }

            const accountId = this.idGen.generate()
            const hashedPassword = await this.passwordUtil.hash(cmd.password)

            const now = new Date()
            const account = new Account(
                accountId,
                cmd.email,
                hashedPassword,
                now,
                now,
                null,
            )
            await ar.insert(account)

            const seller = new Seller(
                account.id,
                null,
                cmd.firstName,
                cmd.middleInitial,
                cmd.lastName,
                false,
                false,
                now,
                now,
            )

            await sr.insert(seller)

            return { sellerId: seller.id }
        })
    }
}
