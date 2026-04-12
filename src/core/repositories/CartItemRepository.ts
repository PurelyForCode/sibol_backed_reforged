import { Repository } from '../interfaces/Repository'
import { CartItem } from '../../models/CartItem'

export interface CartItemRepository extends Repository<CartItem, string> {}
