import express from 'express';
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/studentControllers.mjs';
import upload from '../services/uplodeFile.mjs';

const router = express.Router();

// Define routes for student operations
router.post('/', upload.single('Student_image'), createStudent);
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;