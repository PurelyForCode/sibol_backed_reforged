import { DomainError } from '../DomainError'

export class CategoryNameDuplicateException extends DomainError {
    constructor(name: string) {
        super(
            'CATEGORY_NAME_DUPLICATE',
            `Category with name '${name}' already exists`,
        )
    }
}
