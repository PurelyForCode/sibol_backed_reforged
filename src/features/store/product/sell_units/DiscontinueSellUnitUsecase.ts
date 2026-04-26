import { TransactionManager } from '../../../../core/interfaces/TransactionManager'
import { Usecase } from '../../../../core/interfaces/Usecase'
import { CanNotDiscontinueLastActiveSellUnitException } from '../../../../exceptions/sellUnits/CanNotDiscontinueLastActiveSellUnitException'
import { SellUnitNotFoundException } from '../../../../exceptions/sellUnits/SellUnitNotFoundException'
import { SellerStoreVerifier } from '../../../../services/SellerStoreVerifier'

export type DiscontinueSellUnitCmd = {
    sellUnitId: string
    sellerId: string
}

export class DiscontinueSellUnitUsecase implements Usecase<
    DiscontinueSellUnitCmd,
    any
> {
    constructor(private readonly tm: TransactionManager) {}

    async execute(cmd: DiscontinueSellUnitCmd): Promise<any> {
        return this.tm.transaction(async uow => {
            const sellerRepo = uow.getSellerRepo()
            const storeRepo = uow.getStoreRepo()
            const sellUnitRepo = uow.getSellUnitRepo()

            const verifier = new SellerStoreVerifier(sellerRepo, storeRepo)
            await verifier.verify(cmd.sellerId)

            const sellUnit = await sellUnitRepo.findById(cmd.sellUnitId)
            if (!sellUnit) {
                throw new SellUnitNotFoundException(cmd.sellUnitId)
            }
            const sellUnitCount =
                await sellUnitRepo.countActiveSellUnitInProduct(
                    sellUnit.productId,
                )
            if (sellUnitCount === 1) {
                throw new CanNotDiscontinueLastActiveSellUnitException()
            }

            const now = new Date()
            sellUnit.discontinuedAt = now
            await sellUnitRepo.update(sellUnit)
        })
    }
}
