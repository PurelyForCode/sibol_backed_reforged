import { Usecase } from '../../../core/interfaces/Usecase'
import { InternalServerError } from '../../../errors/InternalServerError'
import { ProductNameIsNotUniqueInStoreException } from '../../../exceptions/products/ProductNameIsNotUniqueInStoreException'
import { SellerHasNoStoreException } from '../../../exceptions/sellers/SellerHasNoStoreException'
import { SellerNotFoundException } from '../../../exceptions/sellers/SellerNotFoundException'
import { BaseUnitOfMeasurement } from '../../../models/product/BaseUnit'
import { Product } from '../../../models/product/Product'
import { ProductStatus } from '../../../models/product/ProductStatus'
import { ProductImage } from '../../../models/ProductImage'
import { SellUnit } from '../../../models/SellUnit'
import { IdGenerator } from '../../../core/interfaces/IdGenerator'
import { TransactionManager } from '../../../core/interfaces/TransactionManager'
import { ImageKeyGenerator } from '../../../core/interfaces/ImageKeyGenerator'
import { ProductCanNotBeCreatedWithoutThumbnailException } from '../../../exceptions/products/ProductCanNotBeCreatedWithoutThumbnailException'

export type AddProductCmd = {
    sellerId: string
    description: string | null
    name: string
    baseUnit: string
    images: { path: string; isThumbnail: boolean }[]
    sellUnits: {
        displayName: string
        price: number
        conversionFactor: number
        isDefault: boolean
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

            if (!cmd.images.length) {
                throw new ProductCanNotBeCreatedWithoutThumbnailException()
            }

            const seller = await sellerRepo.findById(cmd.baseUnit)
            if (!seller) {
                throw new SellerNotFoundException(cmd.sellerId)
            }

            if (!seller.storeId) {
                throw new SellerHasNoStoreException(cmd.sellerId)
            }

            // store validation
            const store = await storeRepo.findById(seller.storeId)
            if (!store) {
                throw new InternalServerError(
                    'Seller has a store but was not found in the database',
                )
            }
            store.assertIsUnbanned()

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
                ProductStatus.incomplete(),
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

            for (const unit of cmd.sellUnits) {
                sellUnits.push(
                    new SellUnit(
                        this.idGen.generate(),
                        product.id,
                        unit.conversionFactor,
                        unit.price,
                        unit.displayName,
                        null,
                        unit.isDefault,
                    ),
                )
            }

            await productRepo.insert(product)
            await Promise.all([
                ...sellUnits.map(u => sellUnitRepo.insert(u)),
                ...images.map(i => productImageRepo.insert(i)),
            ])

            return {
                id: product.id,
            }
        })
    }
}
