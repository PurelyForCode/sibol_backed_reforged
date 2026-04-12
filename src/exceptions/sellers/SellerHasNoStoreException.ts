import { DomainError } from '../DomainError'

export class SellerHasNoStoreException extends DomainError {
    constructor(sellerId: string) {
        super('SELLER_NO_STORE', 'Seller has no store', { sellerId: sellerId })
    }
}
