import multer from "multer"

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
        cb(null, true)
        return
    } else {
        cb(new Error("File is Not an video"), false)
    }
}

const reelUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024
    }
})

export default reelUpload
