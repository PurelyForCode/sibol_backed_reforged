import { DomainError } from '../DomainError'

export class DuplicateSellUnitDisplayNameException extends DomainError {
    constructor(displayName: string) {
        super(
            'DUPLICATE_SELL_UNIT_DISPLAY_NAME',
            `Sell units have duplicate display names`,
            { displayName },
        )
    }
}
