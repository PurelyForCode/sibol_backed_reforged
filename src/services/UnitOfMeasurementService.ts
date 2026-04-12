export class UnitOfMeasurementService {
    constructor() {}

    static isValidBaseUnit(unit: string) {
        if (unit === 'g' || unit === 'cm' || unit === 'ml') {
            return true
        } else {
            return false
        }
    }
}
