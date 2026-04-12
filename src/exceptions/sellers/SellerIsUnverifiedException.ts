import { DomainError } from '../DomainError'

export class SellerIsUnverified extends DomainError {
    constructor(id: string) {
        super('SELLER_IS_UNVERIFIED', 'Seller is unverified', { id })
    }
}
