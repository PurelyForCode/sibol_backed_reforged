import { DomainError } from '../DomainError'

export class StoreIsBannedException extends DomainError {
    constructor(storeId: string) {
        super('STORE_IS_BANNED', 'Store is banned', { storeId })
    }
}
