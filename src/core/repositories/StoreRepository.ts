import { Repository } from '../interfaces/Repository'
import { Store } from '../../models/Store'

export interface StoreRepository extends Repository<Store, string> {
    findOwnerById(ownerId: string): Promise<Store | null>
}
