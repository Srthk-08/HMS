import mongoose from "mongoose";

// Define the hostel schema
const hostelSchema = new mongoose.Schema({
  Hostel_name: {
    type: String,
    required: true
  },
  No_of_Floors: {
    type: Number,
    required: true
  },
  Hostel_Address: {
    type: String,
    required: false
  },
  Admin_id: {
    type: mongoose.Schema.Types.ObjectId, //  Admin is a separate collection
    ref: 'Admin', // Reference to another collection named 'Admin'
    required: true
  }
});

// Create a model from the schema
const Hostel = mongoose.model('Hostel', hostelSchema);

// Export the model
export default Hostel;
