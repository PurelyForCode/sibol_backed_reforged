import * as m from 'multer'
import path from 'path'

const imageUploadDir = path.resolve(process.cwd(), 'uploads', 'images')

const imageDiskStorage = m.diskStorage({
    destination: imageUploadDir,
    filename: (_, file, cb) => {
        const ext = path.extname(file.originalname)
        const name = Date.now() + ext
        cb(null, name)
    },
})

export const imageStorageMiddleware = m.default({ storage: imageDiskStorage })
