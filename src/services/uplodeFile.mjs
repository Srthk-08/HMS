import multer from 'multer';
import path from 'path';

// Set up multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify folder where files will be uploaded
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique file name
  }
});

// File filter for allowed file types (e.g., images only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Only image files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

export default upload;
