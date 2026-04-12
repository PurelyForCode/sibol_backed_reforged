import { DomainError } from '../DomainError'

export class StoreNotFoundException extends DomainError {
    constructor(storeId: string) {
        super('STORE_NOT_FOUND', 'Store not found', { storeId })
    }
}
