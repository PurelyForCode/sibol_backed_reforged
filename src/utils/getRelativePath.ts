import path from 'path'

export function getImageRelativePath(fullPath: string) {
    const uploadDir = path.resolve('uploads', 'images')
    return path.relative(uploadDir, fullPath)
}
