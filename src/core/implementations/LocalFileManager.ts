import p from 'path'
import fs from 'fs/promises'
import { FileManager } from '../interfaces/FileManager'

export class LocalFileManager implements FileManager {
    private uploadDir: string

    constructor() {
        this.uploadDir = p.resolve('uploads/images')
    }

    private resolvePath(key: string): string {
        const safeKey = key.split('/').join(p.sep)
        const fullPath = p.resolve(this.uploadDir, safeKey)
        if (!fullPath.startsWith(this.uploadDir)) {
            throw new Error('Invalid file key (path traversal detected)')
        }
        return fullPath
    }

    async delete(key: string): Promise<void> {
        const filePath = this.resolvePath(key)

        try {
            await fs.unlink(filePath)
        } catch (err: any) {
            if (err.code !== 'ENOENT') {
                throw err
            }
        }
    }

    async deleteMany(keys: string[]): Promise<void> {
        await Promise.all(keys.map(k => this.delete(k)))
    }

    getUrl(key: string): string {
        return `/uploads/images/${key}`
    }

    async exists(key: string): Promise<boolean> {
        const filePath = this.resolvePath(key)

        try {
            await fs.access(filePath)
            return true
        } catch {
            return false
        }
    }
}
