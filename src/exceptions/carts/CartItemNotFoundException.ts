import { DomainError } from '../DomainError'

export class CartItemNotFoundException extends DomainError {
    constructor(cartItemId: string) {
        super('CART_ITEM_NOT_FOUND', `Cart item (${cartItemId}) not found`, {
            cartItemId,
        })
    }
}
