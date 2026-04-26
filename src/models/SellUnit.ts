import { SellUnitIsDiscontinuedException } from '../exceptions/sellUnits/SellUnitIsDiscontinuedException'

export class SellUnit {
    constructor(
        private _id: string,
        private _productId: string,
        private _conversionFactor: number,
        private _displayName: string,
        private _isFractional: boolean,
        private _discontinuedAt: Date | null,
        private _isDefault: boolean,
    ) {}

    assertIsNotDiscontinued() {
        if (this._discontinuedAt) {
            throw new SellUnitIsDiscontinuedException(this.id, this.productId)
        }
    }

    public get isFractional(): boolean {
        return this._isFractional
    }
    public set isFractional(value: boolean) {
        this._isFractional = value
    }
    public get isDefault(): boolean {
        return this._isDefault
    }
    public set isDefault(value: boolean) {
        this._isDefault = value
    }
    public get discontinuedAt(): Date | null {
        return this._discontinuedAt
    }
    public set discontinuedAt(value: Date | null) {
        this._discontinuedAt = value
    }
    public get displayName(): string {
        return this._displayName
    }
    public set displayName(value: string) {
        this._displayName = value
    }
    public get conversionFactor(): number {
        return this._conversionFactor
    }
    public set conversionFactor(value: number) {
        this._conversionFactor = value
    }
    public get productId(): string {
        return this._productId
    }
    public set productId(value: string) {
        this._productId = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
}
