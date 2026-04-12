import { Repository } from '../interfaces/Repository'
import { Product } from '../../models/product/Product'

export interface ProductRepository extends Repository<Product, string> {
    findProducts(ids: string[]): Promise<Map<string, Product>>
    isProductNameUniqueInStore(storeId: string, name: string): Promise<boolean>
}
