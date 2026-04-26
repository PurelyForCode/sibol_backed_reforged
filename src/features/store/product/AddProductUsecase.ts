import { Usecase } from '../../../core/interfaces/Usecase'
import { ProductNameIsNotUniqueInStoreException } from '../../../exceptions/products/ProductNameIsNotUniqueInStoreException'
import { BaseUnitOfMeasurement } from '../../../models/product/BaseUnit'
import { Product } from '../../../models/product/Product'
import { ProductStatus } from '../../../models/product/ProductStatus'
import { ProductImage } from '../../../models/ProductImage'
import { SellUnit } from '../../../models/SellUnit'
import { IdGenerator } from '../../../core/interfaces/IdGenerator'
import { TransactionManager } from '../../../core/interfaces/TransactionManager'
import { ImageKeyGenerator } from '../../../core/interfaces/ImageKeyGenerator'
import { ProductCanNotBeCreatedWithoutThumbnailException } from '../../../exceptions/products/ProductCanNotBeCreatedWithoutThumbnailException'
import { SellerStoreVerifier } from '../../../services/SellerStoreVerifier'
import { UnitPrice } from '../../../models/UnitPrice'
import { MultipleDefaultSellUnitException } from '../../../exceptions/sellUnits/MultipleDefaultSellUnitException'
import { ProductCanNotBeCreatedWithNoSellUnitException } from '../../../exceptions/products/ProductCanNotBeCreatedWithNoSellUnitException'
import { DuplicateSellUnitDisplayNameException } from '../../../exceptions/sellUnits/DuplicateSellUnitDisplayNameException'

export type AddProductCmd = {
    sellerId: string
    description: string | null
    name: string
    baseUnit: string
    images: { path: string; isThumbnail: boolean }[]
    sellUnits: {
        displayName: string
        isFractional: boolean
        conversionFactor: number
        isDefault: boolean
        pricing: {
            basePrice: number
            packagingCost: number
        }
    }[]
}

export class AddProductUsecase implements Usecase<AddProductCmd, any> {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
        private readonly imageKeyGenerator: ImageKeyGenerator,
    ) {}

    async execute(cmd: AddProductCmd): Promise<any> {
        return this.tm.transaction(async uow => {
            const productRepo = uow.getProductRepo()
            const storeRepo = uow.getStoreRepo()
            const sellerRepo = uow.getSellerRepo()
            const sellUnitRepo = uow.getSellUnitRepo()
            const productImageRepo = uow.getProductImageRepo()
            const unitPriceRepo = uow.getUnitPriceRepo()

            if (!cmd.images.length) {
                throw new ProductCanNotBeCreatedWithoutThumbnailException()
            }
            if (!cmd.sellUnits.length) {
                throw new ProductCanNotBeCreatedWithNoSellUnitException()
            }
            if (cmd.sellUnits.filter(u => u.isDefault).length !== 1) {
                throw new MultipleDefaultSellUnitException()
            }

            const sellerStoreResolver = new SellerStoreVerifier(
                sellerRepo,
                storeRepo,
            )

            const { store } = await sellerStoreResolver.verify(cmd.sellerId)

            if (
                !(await productRepo.isProductNameUniqueInStore(
                    store.id,
                    cmd.name,
                ))
            ) {
                throw new ProductNameIsNotUniqueInStoreException(
                    store.id,
                    cmd.name,
                )
            }

            const baseUnit = BaseUnitOfMeasurement.create(cmd.baseUnit)
            const id = this.idGen.generate()
            const now = new Date()

            const product = new Product(
                id,
                null,
                store.id,
                cmd.name,
                cmd.description,
                0,
                0,
                baseUnit,
                null,
                0,
                0,
                ProductStatus.active(),
                now,
                now,
                null,
            )

            const images: ProductImage[] = []
            let idx = 0

            for (const image of cmd.images) {
                const key = this.imageKeyGenerator.generateKey(image.path)
                images.push(
                    new ProductImage(
                        this.idGen.generate(),
                        product.id,
                        key,
                        idx,
                        image.isThumbnail,
                        now,
                    ),
                )
                idx++
            }

            const sellUnits: SellUnit[] = []
            const unitPrices: UnitPrice[] = []

            for (const unit of cmd.sellUnits) {
                const sellUnit = new SellUnit(
                    this.idGen.generate(),
                    product.id,
                    unit.conversionFactor,
                    unit.displayName,
                    unit.isFractional,
                    null,
                    unit.isDefault,
                )
                const unitPrice = new UnitPrice(
                    this.idGen.generate(),
                    sellUnit.id,
                    unit.pricing.basePrice,
                    unit.pricing.packagingCost,
                    now,
                    null,
                )

                sellUnits.push(sellUnit)
                unitPrices.push(unitPrice)
            }

            const scanned = new Set()
            for (const sellUnit of sellUnits) {
                if (scanned.has(sellUnit.displayName)) {
                    throw new DuplicateSellUnitDisplayNameException(
                        sellUnit.displayName,
                    )
                }
                scanned.add(sellUnit.displayName)
            }

            await productRepo.insert(product)

            await Promise.all([
                ...sellUnits.map(u => sellUnitRepo.insert(u)),
                ...images.map(i => productImageRepo.insert(i)),
            ])

            await Promise.all([...unitPrices.map(u => unitPriceRepo.insert(u))])

            return {
                id: product.id,
            }
        })
    }
}
