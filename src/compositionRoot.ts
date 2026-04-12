import { knexInstance } from './config/Knex'
import { ProductController } from './controllers/ProductController'
import { RegistrationController } from './controllers/RegistrationController'
import { RegisterSellerUsecase } from './features/registration/RegisterSellerUsecase'
import { ArgonPasswordUtil } from './core/implementations/ArgonPasswordUtil'
import { KnexTransactionManager } from './core/implementations/KnexTransactionManager'
import { Uuidv7Generator } from './core/implementations/UuidV7IdGenerator'
import { AddProductUsecase } from './features/store/product/AddProductUsecase'
import { LocalFileManager } from './core/implementations/LocalFileManager'
import { MulterDiskStorageKeyGenerator } from './core/implementations/ImageKeyGeneratorImpl'

const tm = new KnexTransactionManager(knexInstance)
const passwordUtil = new ArgonPasswordUtil()
const idGen = new Uuidv7Generator()
const fileManager = new LocalFileManager()
const imageKeyGenerator = new MulterDiskStorageKeyGenerator()

export const registerSellerUsecase = new RegisterSellerUsecase(
    tm,
    passwordUtil,
    idGen,
)
export const registrationController = new RegistrationController(
    registerSellerUsecase,
)

export const addProductUsecase = new AddProductUsecase(tm, idGen)
export const productController = new ProductController(addProductUsecase)
