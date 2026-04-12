export interface FileManager {
    delete(key: string): Promise<void>
    deleteMany(keys: string[]): Promise<void>
    getUrl(key: string): string
    exists(key: string): Promise<boolean>
}
