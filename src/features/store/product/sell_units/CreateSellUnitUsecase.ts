import { IdGenerator } from '../../../../core/interfaces/IdGenerator'
import { TransactionManager } from '../../../../core/interfaces/TransactionManager'
import { Usecase } from '../../../../core/interfaces/Usecase'
import { ProductNotFoundException } from '../../../../exceptions/products/ProductNotFoundException'
import { DuplicateSellUnitDisplayNameException } from '../../../../exceptions/sellUnits/DuplicateSellUnitDisplayNameException'
import { SellUnit } from '../../../../models/SellUnit'
import { UnitPrice } from '../../../../models/UnitPrice'
import { SellerStoreVerifier } from '../../../../services/SellerStoreVerifier'

export type CreateSellUnitCmd = {
    productId: string
    sellUnit: {
        conversionFactor: number
        isFractional: boolean
        basePrice: number
        packagingCost: number
        displayName: string
    }
    sellerId: string
}

export class CreateSellUnitUsecase implements Usecase<
    CreateSellUnitCmd,
    { sellUnitId: string }
> {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}

    async execute(cmd: CreateSellUnitCmd): Promise<{ sellUnitId: string }> {
        return this.tm.transaction(async uow => {
            const productRepo = uow.getProductRepo()
            const sellerRepo = uow.getSellerRepo()
            const storeRepo = uow.getStoreRepo()
            const sellUnitRepo = uow.getSellUnitRepo()
            const unitPriceRepo = uow.getUnitPriceRepo()

            const verifier = new SellerStoreVerifier(sellerRepo, storeRepo)
            await verifier.verify(cmd.sellerId)

            const product = await productRepo.findById(cmd.productId)
            if (!product) {
                throw new ProductNotFoundException(cmd.productId)
            }

            const data = cmd.sellUnit
            if (
                !(await sellUnitRepo.isDisplayNameUniqueInProduct(
                    data.displayName,
                    product.id,
                ))
            ) {
                throw new DuplicateSellUnitDisplayNameException(
                    data.displayName,
                )
            }

            const sellUnit = new SellUnit(
                this.idGen.generate(),
                product.id,
                data.conversionFactor,
                data.displayName,
                data.isFractional,
                null,
                false,
            )

            const now = new Date()

            const unitPrice = new UnitPrice(
                this.idGen.generate(),
                sellUnit.id,
                data.basePrice,
                data.packagingCost,
                now,
                null,
            )
            await sellUnitRepo.insert(sellUnit)
            await unitPriceRepo.insert(unitPrice)
            return { sellUnitId: sellUnit.id }
        })
    }
}
