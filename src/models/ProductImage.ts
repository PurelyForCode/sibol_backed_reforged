export class ProductImage {
    constructor(
        private _id: string,
        private _productId: string,
        private _url: string,
        private _position: number,
        private _isThumbnail: boolean,
        private _createdAt: Date,
    ) {}

    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
    public get productId(): string {
        return this._productId
    }
    public set productId(value: string) {
        this._productId = value
    }
    public get url(): string {
        return this._url
    }
    public set url(value: string) {
        this._url = value
    }
    public get position(): number {
        return this._position
    }
    public set position(value: number) {
        this._position = value
    }
    public get isThumbnail(): boolean {
        return this._isThumbnail
    }
    public set isThumbnail(value: boolean) {
        this._isThumbnail = value
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public set createdAt(value: Date) {
        this._createdAt = value
    }
}
