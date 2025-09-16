import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

// Memory storage for multer
const storage = multer.memoryStorage();

// File filter function to accept only images
const fileFilter: multer.Options['fileFilter'] = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);  // Accept the file
    } else {
        cb(new Error('Only image file types allowed'), false);  // Reject the file with an error message
    }
};

// Multer configuration
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: (5 * 1024) * 1024, // 5MB Limit
    },
});

export default  upload
