export enum CartStatus {
    INACTIVE = 'inactive',
    ACTIVE = 'active',
}
export class Cart {
    constructor(
        private _buyerId: string,
        private _status: string,
    ) {}

    public get status(): string {
        return this._status
    }
    public set status(value: string) {
        this._status = value
    }
    public get buyerId(): string {
        return this._buyerId
    }
    public set buyerId(value: string) {
        this._buyerId = value
    }
}
