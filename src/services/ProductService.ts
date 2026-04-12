import { ProductRepository } from '../core/repositories/ProductRepository'

export class ProductService {
    constructor(private readonly pr: ProductRepository) {}
    async isProductNameUniqueInStore(storeId: string, name: string) {
        return await this.pr.isProductNameUniqueInStore(storeId, name)
    }
}
