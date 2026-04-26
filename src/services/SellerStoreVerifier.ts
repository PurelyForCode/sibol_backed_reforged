import { SellerRepository } from '../core/repositories/SellerRepository'
import { StoreRepository } from '../core/repositories/StoreRepository'
import { InternalServerError } from '../errors/InternalServerError'
import { SellerDoesNotBelongInAStoreException } from '../exceptions/sellers/SellerDoesNotBelongInThatStore'
import { SellerNotFoundException } from '../exceptions/sellers/SellerNotFoundException'
import { Seller } from '../models/Seller'
import { Store } from '../models/Store'
import { StoreSeller } from '../models/StoreSeller'

export class SellerStoreVerifier {
    constructor(
        private sellerRepo: SellerRepository,
        private storeRepo: StoreRepository,
    ) {}

    async verify(sellerId: string): Promise<{
        seller: Seller
        store: Store
        storeSeller: StoreSeller
    }> {
        const seller = await this.sellerRepo.findById(sellerId)
        if (!seller) {
            throw new SellerNotFoundException(sellerId)
        }

        const storeSeller = await this.storeRepo.findStoreSellerById(sellerId)
        if (!storeSeller) {
            throw new SellerDoesNotBelongInAStoreException(sellerId)
        }

        const store = await this.storeRepo.findById(storeSeller.storeId)
        if (!store) {
            throw new InternalServerError(
                'Seller has a store but was not found in the database',
            )
        }

        store.assertIsUnbanned()

        return { seller, store, storeSeller }
    }
}
