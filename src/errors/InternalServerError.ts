export class InternalServerError extends Error {
    constructor(
        msg: string,
        public readonly payload?: unknown,
    ) {
        super(msg)
    }
}
