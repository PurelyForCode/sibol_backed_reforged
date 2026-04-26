import { DomainError } from '../DomainError'

export class BuyerNotFoundException extends DomainError {
    constructor(buyerId: string) {
        super('BUYER_NOT_FOUND', `Buyer (${buyerId}) not found`, { buyerId })
    }
}
