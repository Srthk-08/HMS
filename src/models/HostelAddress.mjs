import mongoose from "mongoose";

// Define the schema for Hostel Address
const addressSchema = new mongoose.Schema({
  addressId: {
    type: mongoose.Schema.Types.ObjectId, // Auto-generate a unique ObjectId for each address
    required: true,
    unique: true // Ensures each address has a unique addressId
  },
  hostelId: {
    type: mongoose.Schema.Types.ObjectId, // Foreign reference to the hostel
    ref: 'Hostel', // Reference to the 'Hostel' collection
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Create a Mongoose model for the Hostel Address
const Address = mongoose.model('Address', addressSchema);

export default Address
