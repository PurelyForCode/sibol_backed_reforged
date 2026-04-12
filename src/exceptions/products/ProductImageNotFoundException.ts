import { DomainError } from '../DomainError'

export class ProductImageNotFoundException extends DomainError {
    constructor(productId: string, imageId: string) {
        super(
            'PRODUCT_IMAGE_NOT_FOUND',
            `Product (${productId}) image (${imageId}) not found`,
            {
                productId: productId,
                imageId: imageId,
            },
        )
    }
}
