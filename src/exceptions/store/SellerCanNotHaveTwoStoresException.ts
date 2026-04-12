import { DomainError } from '../DomainError'

export class SellerCanNotHaveTwoStoresException extends DomainError {
    constructor() {
        super(
            'SELLER_CAN_NOT_HAVE_TWO_STORES',
            'Seller can not have two stores',
        )
    }
}
