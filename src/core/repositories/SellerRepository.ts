import { Repository } from '../interfaces/Repository'
import { Seller } from '../../models/Seller'

export interface SellerRepository extends Repository<Seller, string> {}
