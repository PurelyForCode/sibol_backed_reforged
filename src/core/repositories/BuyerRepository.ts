import { Repository } from '../interfaces/Repository'
import { Buyer } from '../../models/Buyer'

export interface BuyerRepository extends Repository<Buyer, string> {
    findByEmail(email: string): Promise<Buyer | null>
}
