import { DomainError } from '../DomainError'

export class SellerNotFoundException extends DomainError {
    constructor(id: string) {
        super('SELLER_NOT_FOUND', 'Seller not found', { id })
    }
}
