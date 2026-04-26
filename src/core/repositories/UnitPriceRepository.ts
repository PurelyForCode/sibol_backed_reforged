import { Repository } from '../interfaces/Repository'
import { UnitPrice } from '../../models/UnitPrice'

export interface UnitPriceRepository extends Repository<UnitPrice, string> {
    findActiveUnitPrice(sellUnitId: string): Promise<UnitPrice>
}
