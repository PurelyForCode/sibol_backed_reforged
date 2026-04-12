export class Address {
    constructor(
        private _id: string,
        private _regionId: number,
        private _provinceId: number,
        private _municipalityCityId: number,
        private _barangayId: number,
        private _addressLine1: string,
        private _addressLine2: string | null,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {}

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
    public get addressLine2(): string | null {
        return this._addressLine2
    }
    public set addressLine2(value: string | null) {
        this._addressLine2 = value
    }
    public get addressLine1(): string {
        return this._addressLine1
    }
    public set addressLine1(value: string) {
        this._addressLine1 = value
    }
    public get barangayId(): number {
        return this._barangayId
    }
    public set barangayId(value: number) {
        this._barangayId = value
    }
    public get municipalityCityId(): number {
        return this._municipalityCityId
    }
    public set municipalityCityId(value: number) {
        this._municipalityCityId = value
    }
    public get provinceId(): number {
        return this._provinceId
    }
    public set provinceId(value: number) {
        this._provinceId = value
    }
    public get regionId(): number {
        return this._regionId
    }
    public set regionId(value: number) {
        this._regionId = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
}
