import multer from "multer"
import path from "path"

// Set up storage engine for multer (for saving files to the server)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // You can change this to any folder where you want to store the resumes
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      // Set the filename to the original file name (you can modify this to add timestamps for uniqueness)
      cb(null,  Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize multer with the storage configuration
  const upload = multer({
    storage: storage,
    // limits: { fileSize: 10 * 1024 * 1024 }, // Max size: 10MB
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
      }
      cb(null, true);
    }
  });
  
  export default upload;


  