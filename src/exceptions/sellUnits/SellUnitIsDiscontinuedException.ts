import { DomainError } from '../DomainError'

export class SellUnitIsDiscontinuedException extends DomainError {
    constructor(sellUnitId: string, productId: string) {
        super(
            'SELL_UNIT_IS_DISCONTINUED',
            `Sell unit (${sellUnitId}) in product (${productId}) has been discontinued`,
            { sellUnitId, productId },
        )
    }
}
