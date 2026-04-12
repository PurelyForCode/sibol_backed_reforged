export class ProductStatus {
    private constructor(private readonly value: string) {}

    static banned() {
        return new ProductStatus('banned')
    }

    static active() {
        return new ProductStatus('active')
    }
    static incomplete() {
        return new ProductStatus('incomplete')
    }

    getValue(): string {
        return this.value
    }

    equals(other: ProductStatus): boolean {
        return this.value === other.value
    }
}
