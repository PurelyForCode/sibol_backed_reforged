export class ProductStatus {
    private constructor(private readonly value: string) {}

    static banned() {
        return new ProductStatus('banned')
    }
    static active() {
        return new ProductStatus('active')
    }

    getValue(): string {
        return this.value
    }

    equals(other: ProductStatus): boolean {
        return this.value === other.value
    }
}
