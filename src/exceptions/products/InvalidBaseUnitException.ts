import { DomainError } from '../DomainError'

export class InvalidBaseUnitException extends DomainError {
    constructor(invalidBaseUnit: string) {
        super(
            'INVALID_BASE_UNIT_EXCEPTION',
            `${invalidBaseUnit} is not a valid base unit`,
        )
    }
}
