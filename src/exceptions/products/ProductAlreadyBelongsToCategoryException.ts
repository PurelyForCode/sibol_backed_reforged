import { DomainError } from '../DomainError'

export class ProductAlreadyBelongsToCategoryException extends DomainError {
    constructor(productId: string, categoryId: string) {
        super(
            'PRODUCT_ALREADY_BELONGS_TO_CATEGORY',
            `Product (${productId}) already belongs in category (${categoryId})`,
        )
    }
}
