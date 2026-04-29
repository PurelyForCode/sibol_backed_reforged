import { IdGenerator } from '../../../../core/interfaces/IdGenerator'
import { TransactionManager } from '../../../../core/interfaces/TransactionManager'
import { Usecase } from '../../../../core/interfaces/Usecase'
import { SellUnitNotFoundException } from '../../../../exceptions/sellUnits/SellUnitNotFoundException'
import { UnitPrice } from '../../../../models/UnitPrice'
import { SellerStoreVerifier } from '../../../../services/SellerStoreVerifier'

export type UpdateSellUnitCmd = {
    sellUnitId: string
    fields: Partial<{
        basePrice: number
        packagingCost: number
    }>
    sellerId: string
}

export class UpdateSellUnitUsecase implements Usecase<UpdateSellUnitCmd, void> {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}

    async execute(cmd: UpdateSellUnitCmd): Promise<void> {
        return this.tm.transaction(async uow => {
            const unitPriceRepo = uow.getUnitPriceRepo()
            const sellUnitRepo = uow.getUnitPriceRepo()
            const storeRepo = uow.getStoreRepo()
            const sellerRepo = uow.getSellerRepo()

            const verifier = new SellerStoreVerifier(sellerRepo, storeRepo)
            await verifier.verify(cmd.sellerId)

            const sellUnit = await sellUnitRepo.findById(cmd.sellUnitId)
            if (!sellUnit) {
                throw new SellUnitNotFoundException(cmd.sellUnitId)
            }
            const oldUnitPrice = await unitPriceRepo.findActiveUnitPrice(
                cmd.sellUnitId,
            )
            const now = new Date()
            oldUnitPrice.effectiveTo = now

            const newUnitPrice = new UnitPrice(
                this.idGen.generate(),
                sellUnit.id,
                cmd.fields.basePrice
                    ? cmd.fields.basePrice
                    : oldUnitPrice.basePrice,
                cmd.fields.packagingCost
                    ? cmd.fields.packagingCost
                    : oldUnitPrice.packagingCost,
                now,
                null,
            )

            await unitPriceRepo.insert(newUnitPrice)
        })
    }
}
