import { DomainError } from '../DomainError'

export class CategoryNotInStoreException extends DomainError {
    constructor(categoryId: string, storeId: string) {
        super(
            'CATEGORY_NOT_IN_STORE',
            `Category (${categoryId}) does not belong in store (${storeId})`,
            {
                categoryId,
            },
        )
    }
}
