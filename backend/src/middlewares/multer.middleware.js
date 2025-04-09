import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    limits: { fileSize: 1024 * 1024 * 50 },
    filename: function (_, file, cb) {
        const fileParts = file.originalname.split(".");
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${fileParts[0]}-${uniqueSuffix}.${fileParts.pop()}`);
    }
})

export const upload = multer({ storage, });