import { SellerIsBannedException } from '../exceptions/sellers/SellerIsBannedException'
import { SellerIsUnverified } from '../exceptions/sellers/SellerIsUnverifiedException'

export class Seller {
    constructor(
        private _id: string,
        private _storeId: string | null,
        private _firstName: string,
        private _middleInitial: string,
        private _lastName: string,
        private _isVerified: boolean,
        private _isBanned: boolean,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {}

    assertCanInteract() {
        if (this.isBanned) {
            throw new SellerIsBannedException(this.id)
        }
        if (!this.isVerified) {
            throw new SellerIsUnverified(this.id)
        }
    }

    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
    public get storeId(): string | null {
        return this._storeId
    }
    public set storeId(value: string | null) {
        this._storeId = value
    }
    public get firstName(): string {
        return this._firstName
    }
    public set firstName(value: string) {
        this._firstName = value
    }
    public get middleInitial(): string {
        return this._middleInitial
    }
    public set middleInitial(value: string) {
        this._middleInitial = value
    }
    public get lastName(): string {
        return this._lastName
    }
    public set lastName(value: string) {
        this._lastName = value
    }
    public get isVerified(): boolean {
        return this._isVerified
    }
    public set isVerified(value: boolean) {
        this._isVerified = value
    }
    public get isBanned(): boolean {
        return this._isBanned
    }
    public set isBanned(value: boolean) {
        this._isBanned = value
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public set createdAt(value: Date) {
        this._createdAt = value
    }
    public get updatedAt(): Date {
        return this._updatedAt
    }
    public set updatedAt(value: Date) {
        this._updatedAt = value
    }
}
