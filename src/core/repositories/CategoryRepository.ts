import { Repository } from '../interfaces/Repository'
import { Category } from '../../models/Category'
import { Product } from '../../models/product/Product'

export interface CategoryRepository extends Repository<Category, string> {
    findAllCategoriesFromStore(storeId: string): Promise<Category[]>
    isCategoryNameUniqueInStore(storeId: string, name: string): Promise<boolean>
    findAllProductsInCategory(categoryId: string): Promise<Product[]>
    isProductInCategory(productId: string, categoryId: string): Promise<boolean>
    addProductToCategory(productId: string, categoryId: string): Promise<void>
    removeProductInCategory(
        productId: string,
        categoryId: string,
    ): Promise<void>
}
