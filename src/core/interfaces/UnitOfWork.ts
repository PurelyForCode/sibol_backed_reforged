import { AccountRepository } from '../repositories/AccountRepository'
import { AddressRepository } from '../repositories/AddressRepository'
import { BuyerRepository } from '../repositories/BuyerRepository'
import { CartItemRepository } from '../repositories/CartItemRepository'
import { CartRepository } from '../repositories/CartRepository'
import { ProductImageRepository } from '../repositories/ProductImageRepository'
import { ProductRepository } from '../repositories/ProductRepository'
import { SellerRepository } from '../repositories/SellerRepository'
import { SellUnitRepository } from '../repositories/SellUnitRepository'
import { StoreRepository } from '../repositories/StoreRepository'

export interface UnitOfWork {
    getSellerRepo(): SellerRepository
    getProductRepo(): ProductRepository
    getAccountRepo(): AccountRepository
    getBuyerRepo(): BuyerRepository
    getCartRepo(): CartRepository
    getCartItemRepo(): CartItemRepository
    getAddressRepo(): AddressRepository
    getStoreRepo(): StoreRepository
    getSellUnitRepo(): SellUnitRepository
    getProductImageRepo(): ProductImageRepository
}
