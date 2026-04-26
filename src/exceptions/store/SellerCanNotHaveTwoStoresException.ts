import { DomainError } from '../DomainError'

export class SellerAlreadyBelongsToAStoreException extends DomainError {
    constructor(sellerId: string) {
        super(
            'SELLER_ALREADY_BELONGS_TO_A_STORE',
            `Seller (${sellerId}) already belongs to a store`,
        )
    }
}
