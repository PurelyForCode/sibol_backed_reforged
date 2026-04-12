import { DomainError } from '../DomainError'

export class ProductNotFoundException extends DomainError {
    constructor(productId: string) {
        super('PRODUCT_NOT_FOUND', `Product (${productId}) not found`, {
            productId: productId,
        })
    }
}
