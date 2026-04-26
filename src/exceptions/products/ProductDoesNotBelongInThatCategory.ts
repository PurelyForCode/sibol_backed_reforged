import { DomainError } from '../DomainError'

export class ProductDoesNotBelongInThatCategoryException extends DomainError {
    constructor(productId: string, categoryId: string) {
        super(
            'PRODUCT_DOES_NOT_BELONG_IN_THAT_CATEGORY',
            `Product (${productId}) does not belong in category (${categoryId})`,
            {
                productId: productId,
                categoryId: categoryId,
            },
        )
    }
}
