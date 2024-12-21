import Student from '../models/Student.mjs';
import fs from 'fs';
import path from 'path';

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const { Student_name, contact_no, permanent_address, adhar_id, allotation_date } = req.body;

    // Validate required fields
    if (!Student_name || !contact_no || !permanent_address || !adhar_id || !allotation_date) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    // Check for duplicate Aadhaar ID
    const existingStudent = await Student.findOne({ adhar_id });
    if (existingStudent) {
      return res.status(409).json({ message: 'Student with this Aadhaar ID already exists.' });
    }

    // Get image path if uploaded
    let Student_image = null;
    if (req.file) {
      Student_image = req.file.path;
    }

    // Create a new student record
    const newStudent = new Student({
      Student_name,
      contact_no,
      permanent_address,
      adhar_id,
      allotation_date,
      Student_image,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully.', student: newStudent });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: 'Error creating student.', error });
  }
};

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students.', error });
  }
};

// Get a single student by ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Error fetching student.', error });
  }
};

// Update a student by ID

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      const existingStudent = await Student.findById(id);
      if (existingStudent && existingStudent.Student_image) {
        // Delete the old image from server if it exists
        fs.unlinkSync(path.join(__dirname, '..', existingStudent.Student_image));
      }

      // Add new image path to updates
      updates.Student_image = req.file.path;
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json({ message: 'Student updated successfully.', student: updatedStudent });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Error updating student.', error });
  }
};

// Delete a student by ID
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Error deleting student.', error });
  }
};
