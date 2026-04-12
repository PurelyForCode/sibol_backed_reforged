import { uuidv7 } from 'uuidv7'
import { IdGenerator } from '../interfaces/IdGenerator'

export class Uuidv7Generator implements IdGenerator {
    generate() {
        return uuidv7()
    }
}
