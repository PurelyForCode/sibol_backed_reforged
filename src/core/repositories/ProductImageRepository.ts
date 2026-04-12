import { Repository } from '../interfaces/Repository'
import { ProductImage } from '../../models/ProductImage'

export interface ProductImageRepository extends Repository<
    ProductImage,
    string
> {
    findAllByProductId(productId: string): Promise<ProductImage[]>
    findThumbnailOfProduct(productId: string): Promise<ProductImage>
}
