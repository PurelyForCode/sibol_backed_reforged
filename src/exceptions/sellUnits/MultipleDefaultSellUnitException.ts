import { DomainError } from '../DomainError'

export class MultipleDefaultSellUnitException extends DomainError {
    constructor() {
        super(
            'MULTIPLE_DEFAULT_SELL_UNIT',
            `Product may only have one default sell unit`,
        )
    }
}
