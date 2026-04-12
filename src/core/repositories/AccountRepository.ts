import { Repository } from '../interfaces/Repository'
import { Account } from '../../models/Account'

export interface AccountRepository extends Repository<Account, string> {
    findByEmail(email: string): Promise<Account | null>
}
