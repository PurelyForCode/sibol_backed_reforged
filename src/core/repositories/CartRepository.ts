import { Repository } from '../interfaces/Repository'
import { Cart } from '../../models/Cart'

export interface CartRepository extends Repository<Cart, string> {}
