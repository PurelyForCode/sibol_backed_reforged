export class PaymentMethod {}

export class OrderStatus {
    private constructor(private readonly value: string) {}

    static created() {
        return new OrderStatus('created')
    }

    static processing() {
        return new OrderStatus('processing')
    }

    static paid() {
        return new OrderStatus('paid')
    }

    static failed() {
        return new OrderStatus('failed')
    }

    static shipping() {
        return new OrderStatus('shipping')
    }

    static inTransit() {
        return new OrderStatus('in transit')
    }

    static delivered() {
        return new OrderStatus('delivered')
    }

    static cancelled() {
        return new OrderStatus('cancelled')
    }

    getValue(): string {
        return this.value
    }

    equals(other: OrderStatus): boolean {
        return this.value === other.value
    }
}

export class Order {
    constructor(
        private id: string,
        private buyerId: string,
        private storeId: string,
        private totalPrice: number,
        private status: OrderStatus,
        private paymentMethod: PaymentMethod,
        private createdAt: Date,
        private updatedAt: Date,
        private cancelledAt: Date | null,
    ) {}
}
