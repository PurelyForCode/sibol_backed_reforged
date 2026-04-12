import {
    AddProductCmd,
    AddProductUsecase,
} from '../features/store/product/AddProductUsecase'

export class ProductController {
    constructor(private addProductUsecase: AddProductUsecase) {}

    async addProduct(cmd: AddProductCmd) {
        return await this.addProductUsecase.execute(cmd)
    }
}
