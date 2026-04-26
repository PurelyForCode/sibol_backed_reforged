export class UnitPrice {
    constructor(
        private _id: string,
        private _sellUnitId: string,
        private _basePrice: number,
        private _packagingCost: number,
        private _effectiveFrom: Date,
        private _effectiveTo: Date | null,
    ) {}

    public get effectiveTo(): Date | null {
        return this._effectiveTo
    }
    public set effectiveTo(value: Date | null) {
        this._effectiveTo = value
    }
    public get effectiveFrom(): Date {
        return this._effectiveFrom
    }
    public set effectiveFrom(value: Date) {
        this._effectiveFrom = value
    }
    public get packagingCost(): number {
        return this._packagingCost
    }
    public set packagingCost(value: number) {
        this._packagingCost = value
    }
    public get sellUnitId(): string {
        return this._sellUnitId
    }
    public set sellUnitId(value: string) {
        this._sellUnitId = value
    }
    public get basePrice(): number {
        return this._basePrice
    }
    public set basePrice(value: number) {
        this._basePrice = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
}
