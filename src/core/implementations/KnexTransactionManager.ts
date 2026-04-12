import { Knex } from 'knex'
import { UnitOfWork } from '../interfaces/UnitOfWork'
import { KnexUnitOfWork } from './KnexUnitOfWork'
import { TransactionManager } from '../interfaces/TransactionManager'

export class KnexTransactionManager implements TransactionManager {
    constructor(private readonly knex: Knex) {}

    async transaction<T>(fn: (uow: UnitOfWork) => Promise<T>): Promise<T> {
        return await this.knex.transaction(async trx => {
            const uow = new KnexUnitOfWork(trx)
            return await fn(uow)
        })
    }
}
