// models/Student.mjs
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the schema for the Student model
const StudentSchema = new Schema({
  Student_name: {
    type: String,
    required: true,
  },
  contact_no: {
    type: String,
    required: true,
  },
  permanent_address: {
    type: String,
    required: true,
  },
  adhar_id: {
    type: String,
    required: true,
    unique: true,
  },
  allotation_date: {
    type: Date,
    required: true,
  },
  Student_image: {
    type: String, // URL to the stored image
    required: false,
  },
});

// Create and export the Student model
export default model('Student', StudentSchema);
