import { DomainError } from '../DomainError'

export class ProductNameIsNotUniqueInStoreException extends DomainError {
    constructor(storeId: string, name: string) {
        super(
            'PRODUCT_NAME_NOT_UNIQUE_IN_STORE',
            `${name} is not a unique product name inside store (${storeId})`,
        )
    }
}
