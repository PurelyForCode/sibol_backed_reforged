import { Repository } from '../interfaces/Repository'
import { Store } from '../../models/Store'
import { StoreSeller } from '../../models/StoreSeller'

export interface StoreRepository extends Repository<Store, string> {
    findOwner(storeId: string): Promise<Store | null>
    findStoreSellerById(sellerId: string): Promise<StoreSeller | null>
    doesSellerBelongInAStore(sellerId: string): Promise<boolean>
    findStoreByProductId(productId: string): Promise<Store | null>
    findAllStoresByProductIds(ids: string[]): Promise<Store[]>
}
