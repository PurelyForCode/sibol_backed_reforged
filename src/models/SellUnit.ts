export class SellUnit {
    constructor(
        private _id: string,
        private _productId: string,
        private _conversionFactor: number,
        private _pricePerUnit: number,
        private _displayName: string,
        private _discontinuedAt: Date | null,
        private _isDefault: boolean,
    ) {}

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
    public get pricePerUnit(): number {
        return this._pricePerUnit
    }
    public set pricePerUnit(value: number) {
        this._pricePerUnit = value
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
