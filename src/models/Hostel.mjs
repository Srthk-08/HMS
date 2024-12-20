const mongoose = require('mongoose');

// Define the hostel schema
const hostelSchema = new mongoose.Schema({
  Hostel_id: {
    type: String, // Use string if IDs are alphanumeric, or you can use ObjectId if you're linking to other collections
    required: true,
    unique: true
  },
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
    required: true
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
module.exports = Hostel;
