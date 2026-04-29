import { Repository } from '../interfaces/Repository'
import { Order } from '../../models/Order'

export interface OrderRepository extends Repository<Order, string> {}
