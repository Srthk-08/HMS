import mongoose from "mongoose";

// Define the room schema
const roomSchema = new mongoose.Schema({
  Room_id: {
    type: String, // Unique identifier for the room, can be alphanumeric
    required: true,
    unique: true
  },
  Room_no: {
    type: String, // Room number (e.g., 101, 102, etc.)
    required: true
  },
  No_of_Beds: {
    type: Number, // Number of beds in the room
    required: true
  },
  Room_rent: {
    type: Number, // Rent for the room
    required: true
  },
  Floor_no: {
    type: Number, // The floor number the room is on
    required: true
  },
  Floor_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Floor collection
    ref: 'Floor', // Reference to the Floor model
    required: true
  },
  No_of_Kitchens: {
    type: Number, // Number of kitchens on the floor
    required: true
  },
  No_of_Washrooms: {
    type: Number, // Number of washrooms in the room
    required: true
  }
});

// Create a model from the schema
const Room = mongoose.model('Room', roomSchema);

// Export the model
export default Room;
