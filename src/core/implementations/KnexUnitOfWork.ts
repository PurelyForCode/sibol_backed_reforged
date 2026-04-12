import { UnitOfWork } from '../interfaces/UnitOfWork'
import { Knex } from 'knex'
import { AccountRepository } from '../repositories/AccountRepository'
import { SellerRepository } from '../repositories/SellerRepository'
import { BuyerRepository } from '../repositories/BuyerRepository'
import { CartItemRepository } from '../repositories/CartItemRepository'
import { CartRepository } from '../repositories/CartRepository'

export class KnexUnitOfWork implements UnitOfWork {
    constructor(private transactionContext: Knex.Transaction) {}

    getBuyerRepo(): BuyerRepository {
        throw new Error('Method not implemented.')
    }
    getCartRepo(): CartRepository {
        throw new Error('Method not implemented.')
    }
    getCartItemRepo(): CartItemRepository {
        throw new Error('Method not implemented.')
    }
    getSellerRepo(): SellerRepository {
        throw new Error('Method not implemented.')
    }
    getAccountRepo(): AccountRepository {
        throw new Error('Method not implemented.')
    }
}
