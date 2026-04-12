import { Repository } from '../interfaces/Repository'
import { SellUnit } from '../../models/SellUnit'

export interface SellUnitRepository extends Repository<SellUnit, string> {
    findByProductId(productId: string): Promise<SellUnit[]>
}
