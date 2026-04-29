import { Repository } from '../interfaces/Repository'
import { CartItem } from '../../models/CartItem'

export interface CartItemRepository extends Repository<CartItem, string> {
    findOneByCartId(
        cartItemId: string,
        cartId: string,
    ): Promise<CartItem | null>

    findAllByCartId(cartId: string): Promise<CartItem[]>
    findAllByCartIdIncludeStoreId(
        cartId: string,
    ): Promise<{ cartItem: CartItem; storeId: string }[]>

    updateAll(items: CartItem[]): Promise<void>
}
