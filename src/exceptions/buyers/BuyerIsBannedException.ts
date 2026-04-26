import { DomainError } from '../DomainError'

export class BuyerIsBannedException extends DomainError {
    constructor(buyerId: string) {
        super('BUYER_IS_BANNED', `Buyer (${buyerId}) is banned`, { buyerId })
    }
}
