import multer from "multer";

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the destination folder for uploaded files
        cb(null, '/path/to/destination');
    },
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

// Set up multer upload middleware
const upload = multer({ storage: storage });

export {upload};