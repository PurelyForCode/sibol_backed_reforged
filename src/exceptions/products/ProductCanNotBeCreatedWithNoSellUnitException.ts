import { DomainError } from '../DomainError'

export class ProductCanNotBeCreatedWithNoSellUnitException extends DomainError {
    constructor() {
        super(
            'PRODUCT_CREATION_NO_SELL_UNIT',
            'Product can not be created without a single sell unit',
        )
    }
}
