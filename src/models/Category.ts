export class Category {
    constructor(
        private _id: string,
        private _storeId: string,
        private _name: string,
    ) {}

    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
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
