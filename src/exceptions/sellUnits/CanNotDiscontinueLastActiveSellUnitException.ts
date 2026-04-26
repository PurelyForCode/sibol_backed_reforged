import { DomainError } from '../DomainError'

export class CanNotDiscontinueLastActiveSellUnitException extends DomainError {
    constructor() {
        super(
            'CAN_NOT_DISCONTINUE_LAST_ACTIVE_SELL_UNIT',
            `Can not discontinue a sell unit if it is the last one active`,
        )
    }
}
