import { DomainError } from '../DomainError'

export class ProductCanNotBeCreatedWithoutThumbnailException extends DomainError {
    constructor() {
        super(
            'PRODUCT_CREATION_NO_THUMBNAIL',
            'Product can not be created without a thumbnail',
        )
    }
}
