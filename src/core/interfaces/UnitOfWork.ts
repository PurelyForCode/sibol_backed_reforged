import { AccountRepository } from '../repositories/AccountRepository'
import { AddressRepository } from '../repositories/AddressRepository'
import { BuyerRepository } from '../repositories/BuyerRepository'
import { CartItemRepository } from '../repositories/CartItemRepository'
import { CartRepository } from '../repositories/CartRepository'
import { CategoryRepository } from '../repositories/CategoryRepository'
import { ProductImageRepository } from '../repositories/ProductImageRepository'
import { ProductRepository } from '../repositories/ProductRepository'
import { SellerRepository } from '../repositories/SellerRepository'
import { SellUnitRepository } from '../repositories/SellUnitRepository'
import { StoreRepository } from '../repositories/StoreRepository'
import { UnitPriceRepository } from '../repositories/UnitPriceRepository'

export interface UnitOfWork {
    getSellerRepo(): SellerRepository
    getProductRepo(): ProductRepository
    getCategoryRepo(): CategoryRepository
    getAccountRepo(): AccountRepository
    getBuyerRepo(): BuyerRepository
    getCartRepo(): CartRepository
    getCartItemRepo(): CartItemRepository
    getAddressRepo(): AddressRepository
    getStoreRepo(): StoreRepository
    getSellUnitRepo(): SellUnitRepository
    getUnitPriceRepo(): UnitPriceRepository
    getProductImageRepo(): ProductImageRepository
}
