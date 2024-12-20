// models/Admin.mjs
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the schema for the Admin model
const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export the Admin model
export default model('Admin', AdminSchema);
