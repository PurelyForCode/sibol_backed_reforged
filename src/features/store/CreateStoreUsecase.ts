import { Usecase } from '../../core/interfaces/Usecase'
import { SellerNotFoundException } from '../../exceptions/sellers/SellerNotFoundException'
import { SellerCanNotHaveTwoStoresException } from '../../exceptions/store/SellerCanNotHaveTwoStoresException'
import { Address } from '../../models/Address'
import { Store } from '../../models/Store'
import { IdGenerator } from '../../core/interfaces/IdGenerator'
import { TransactionManager } from '../../core/interfaces/TransactionManager'

export type CreateStoreCmd = {
    sellerId: string
    store: {
        name: string
        slug: string
        description: string | null
    }
    address: {
        region: number
        province: number
        municipalityCity: number
        barangay: number
        addressLine1: string
        addressLine2: string | null
    }
    supportEmail: string | null
    supportPhone: string | null
}

export class CreateStoreUsecase implements Usecase<
    CreateStoreCmd,
    { storeId: string }
> {
    constructor(
        private tm: TransactionManager,
        private idGen: IdGenerator,
    ) {}

    async execute(cmd: CreateStoreCmd): Promise<any> {
        await this.tm.transaction(async uow => {
            const addressRepo = uow.getAddressRepo()
            const storeRepo = uow.getStoreRepo()
            const sellerRepo = uow.getSellerRepo()

            const seller = await sellerRepo.findById(cmd.sellerId)
            if (!seller) {
                throw new SellerNotFoundException(cmd.sellerId)
            }
            seller.assertCanInteract()

            const sellerHasStore = await storeRepo.findOwnerById(cmd.sellerId)
            if (sellerHasStore) {
                throw new SellerCanNotHaveTwoStoresException()
            }

            const addressId = this.idGen.generate()
            const now = new Date()
            const address = new Address(
                addressId,
                cmd.address.region,
                cmd.address.province,
                cmd.address.municipalityCity,
                cmd.address.barangay,
                cmd.address.addressLine1,
                cmd.address.addressLine2,
                now,
                now,
            )
            await addressRepo.insert(address)

            const storeId = this.idGen.generate()
            const store = new Store(
                storeId,
                address.id,
                cmd.store.name,
                cmd.store.description,
                cmd.supportEmail,
                cmd.supportPhone,
                0,
                null,
            )

            await storeRepo.insert(store)
        })
    }
}
