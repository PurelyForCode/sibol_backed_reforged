import { BaseUnitOfMeasurement } from './BaseUnit'
import { ProductStatus } from './ProductStatus'

export class Product {
    constructor(
        private _id: string,
        private _categoryId: string | null,
        private _storeId: string,
        private _name: string,
        private _description: string | null,
        private _availableStock: number,
        private _reservedStock: number,
        private _baseUnit: BaseUnitOfMeasurement,
        private _rating: number | null,
        private _reviewCount: number,
        private _saleCount: number,
        private _status: ProductStatus,
        private _createdAt: Date,
        private _updatedAt: Date,
        private _deletedAt: Date | null,
    ) {}

    public get deletedAt(): Date | null {
        return this._deletedAt
    }
    public set deletedAt(value: Date | null) {
        this._deletedAt = value
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
    public get status(): ProductStatus {
        return this._status
    }
    public set status(value: ProductStatus) {
        this._status = value
    }
    public get saleCount(): number {
        return this._saleCount
    }
    public set saleCount(value: number) {
        this._saleCount = value
    }
    public get reviewCount(): number {
        return this._reviewCount
    }
    public set reviewCount(value: number) {
        this._reviewCount = value
    }
    public get rating(): number | null {
        return this._rating
    }
    public set rating(value: number | null) {
        this._rating = value
    }
    public get baseUnit(): BaseUnitOfMeasurement {
        return this._baseUnit
    }
    public set baseUnit(value: BaseUnitOfMeasurement) {
        this._baseUnit = value
    }
    public get reservedStock(): number {
        return this._reservedStock
    }
    public set reservedStock(value: number) {
        this._reservedStock = value
    }
    public get availableStock(): number {
        return this._availableStock
    }
    public set availableStock(value: number) {
        this._availableStock = value
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
    public get storeId(): string {
        return this._storeId
    }
    public set storeId(value: string) {
        this._storeId = value
    }
    public get categoryId(): string | null {
        return this._categoryId
    }
    public set categoryId(value: string | null) {
        this._categoryId = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
}
