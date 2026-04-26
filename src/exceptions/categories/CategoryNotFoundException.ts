import { DomainError } from '../DomainError'

export class CategoryNotFoundException extends DomainError {
    constructor(categoryId: string) {
        super('CATEGORY_NOT_FOUND', `Category (${categoryId}) not found`, {
            categoryId,
        })
    }
}
