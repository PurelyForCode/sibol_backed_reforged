import { DomainError } from '../DomainError'

export class SellUnitNotFoundException extends DomainError {
    constructor(sellUnitId: string, productId?: string) {
        let msg: string
        if (productId) {
            msg = `Sell unit (${sellUnitId}) not found in product (${productId})`
        } else {
            msg = `Sell unit (${sellUnitId}) not found`
        }
        super('SELL_UNIT_NOT_FOUND', msg, {
            sellUnitId,
        })
    }
}
