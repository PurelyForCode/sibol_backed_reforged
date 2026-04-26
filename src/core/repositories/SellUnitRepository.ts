import { Repository } from '../interfaces/Repository'
import { SellUnit } from '../../models/SellUnit'

export interface SellUnitRepository extends Repository<SellUnit, string> {
    findByProductId(productId: string): Promise<SellUnit[]>
    doesSellUnitExistInProduct(
        sellUnitId: string,
        productId: string,
    ): Promise<boolean>
    isDisplayNameUniqueInProduct(
        displayName: string,
        productId: string,
    ): Promise<boolean>
    countActiveSellUnitInProduct(productId: string): Promise<number>
}
