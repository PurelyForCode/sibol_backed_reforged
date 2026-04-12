import { DomainError } from '../DomainError'

export class SellerIsBannedException extends DomainError {
    constructor(id: string) {
        super('SELLER_IS_BANNED', 'Seller is banned', { id })
    }
}
