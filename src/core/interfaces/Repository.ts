export interface Repository<K, Id> {
    insert(x: K): Promise<void>
    delete(id: Id): Promise<void>
    update(x: K): Promise<void>
    findById(id: Id): Promise<K | null>
}
