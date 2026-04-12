import { InvalidBaseUnitException } from '../../exceptions/products/InvalidBaseUnitException'

export class BaseUnitOfMeasurement {
    static readonly VALID_UNITS = ['g', 'cm', 'ml', 'pcs'] as const

    private constructor(private readonly value: string) {}

    static create(value: string): BaseUnitOfMeasurement {
        if (!this.VALID_UNITS.includes(value as any)) {
            throw new InvalidBaseUnitException(value)
        }
        return new BaseUnitOfMeasurement(value)
    }

    getValue(): string {
        return this.value
    }

    equals(other: BaseUnitOfMeasurement): boolean {
        return this.value === other.value
    }
}
