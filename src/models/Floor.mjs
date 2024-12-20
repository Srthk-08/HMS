import mongoose from "mongoose";

// Define the floor schema
const floorSchema = new mongoose.Schema({
  Floor_id: {
    type: String, // Unique identifier for the floor, can be alphanumeric
    required: true,
    unique: true
  },
  Floor_no: {
    type: Number, // The floor number (e.g., 1, 2, 3, etc.)
    required: true
  },
  No_of_Rooms: {
    type: Number, // Number of rooms on the floor
    required: true
  },
  Floor_Rent: {
    type: Number, // Rent for the floor
    required: true
  },
  No_of_Washrooms: {
    type: Number, // Number of washrooms on the floor
    required: true
  },
  Hostel_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Hostel collection
    ref: 'Hostel', // Reference to Hostel collection
    required: true
  }
});

// Create a model from the schema
const Floor = mongoose.model('Floor', floorSchema);

// Export the model
export default Floor;
