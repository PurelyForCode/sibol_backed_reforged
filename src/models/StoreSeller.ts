export class StoreSeller {
    constructor(
        private _id: string,
        private _isOwner: boolean,
        private _storeId: string,
        private _sellerId: string,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {}
    public get isOwner(): boolean {
        return this._isOwner
    }
    public set isOwner(value: boolean) {
        this._isOwner = value
    }

    public get updatedAt(): Date {
        return this._updatedAt
    }
    public set updatedAt(value: Date) {
        this._updatedAt = value
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public set createdAt(value: Date) {
        this._createdAt = value
    }
    public get sellerId(): string {
        return this._sellerId
    }
    public set sellerId(value: string) {
        this._sellerId = value
    }
    public get storeId(): string {
        return this._storeId
    }
    public set storeId(value: string) {
        this._storeId = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
}
