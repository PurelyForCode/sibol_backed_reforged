import { DomainError } from '../DomainError'

export class SellerDoesNotBelongInAStoreException extends DomainError {
    constructor(id: string) {
        super(
            'SELLER_DOES_NOT_BELONG_IN_A_STORE',
            'Seller does not belong in a store',
            { id },
        )
    }
}
