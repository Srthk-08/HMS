import mongoose from "mongoose";

// Define the floor schema
const floorSchema = new mongoose.Schema({
  Floor_no: {
    type: Number, // The floor number (e.g., 1, 2, 3, etc.)
    required: true
  },Hostel_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Hostel collection
    ref: 'Hostel', // Reference to Hostel collection
    required: true
  },
  No_of_Rooms: {
    type: Number, // Number of rooms on the floor
    required: false
  },
  Floor_Rent: {
    type: Number, // Rent for the floor
    required: false
  },
  No_of_Washrooms: {
    type: Number, // Number of washrooms on the floor
    required: false
  },
  No_of_Kitchens:{
    type:Number,
    require:false
  }
});

// Create a model from the schema
const Floor = mongoose.model('Floor', floorSchema);

// Export the model
export default Floor;
