import { StoreIsBannedException } from '../exceptions/store/StoreIsBannedException'

export class Store {
    constructor(
        private _id: string,
        private _addressId: string,
        private _name: string,
        private _description: string | null,
        private _supportEmail: string | null,
        private _supportPhone: string | null,
        private _totalSales: number,
        private _bannedAt: Date | null,
    ) {}

    assertIsUnbanned() {
        if (this._bannedAt !== null) {
            throw new StoreIsBannedException(this.id)
        }
    }

    public get bannedAt(): Date | null {
        return this._bannedAt
    }
    public set bannedAt(value: Date | null) {
        this._bannedAt = value
    }
    public get totalSales(): number {
        return this._totalSales
    }
    public set totalSales(value: number) {
        this._totalSales = value
    }
    public get supportPhone(): string | null {
        return this._supportPhone
    }
    public set supportPhone(value: string | null) {
        this._supportPhone = value
    }
    public get supportEmail(): string | null {
        return this._supportEmail
    }
    public set supportEmail(value: string | null) {
        this._supportEmail = value
    }
    public get description(): string | null {
        return this._description
    }
    public set description(value: string | null) {
        this._description = value
    }
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    public get addressId(): string {
        return this._addressId
    }
    public set addressId(value: string) {
        this._addressId = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
}
