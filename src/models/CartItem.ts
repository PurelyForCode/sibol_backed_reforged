export class CartItem {
    constructor(
        private _id: string,
        private _cartId: string,
        private _productId: string,
        private _sellUnitId: string,
        private _quantity: number,
        private _isValid: boolean,
    ) {}

    public get isValid(): boolean {
        return this._isValid
    }
    public set isValid(value: boolean) {
        this._isValid = value
    }
    public get quantity(): number {
        return this._quantity
    }
    public set quantity(value: number) {
        this._quantity = value
    }
    public get sellUnitId(): string {
        return this._sellUnitId
    }
    public set sellUnitId(value: string) {
        this._sellUnitId = value
    }
    public get productId(): string {
        return this._productId
    }
    public set productId(value: string) {
        this._productId = value
    }
    public get cartId(): string {
        return this._cartId
    }
    public set cartId(value: string) {
        this._cartId = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
}
