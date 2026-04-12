import p from 'path'
import { ImageKeyGenerator } from '../interfaces/ImageKeyGenerator'

export class MulterDiskStorageImageKeyGenerator implements ImageKeyGenerator {
    private uploadDir: string

    constructor(uploadDir: string = 'uploads/images') {
        this.uploadDir = p.resolve(uploadDir)
    }

    generateKey(fullPath: string): string {
        const relative = p.relative(this.uploadDir, fullPath)
        return relative.split(p.sep).join('/')
    }
}
