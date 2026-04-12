import { Repository } from '../interfaces/Repository'
import { Address } from '../../models/Address'

export interface AddressRepository extends Repository<Address, string> {}
