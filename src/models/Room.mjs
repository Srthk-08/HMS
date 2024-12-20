import mongoose from "mongoose";

// Define the room schema
const roomSchema = new mongoose.Schema({
    Room_no: {
        type: String, // Room number (e.g., 101, 102, etc.)
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
    }, is_Full: {
        type: Boolean,
        required: true,
        default: false
    },
    No_of_Beds: {
        type: Number, // Number of beds in the room
        required: false
    },
    Room_rent: {
        type: Number, // Rent for the room
        required: false
    },
    No_of_Kitchens: {
        type: Number, // Number of kitchens on the floor
        required: false
    },
    No_of_Washrooms: {
        type: Number, // Number of washrooms in the room
        required: false
    },
});

// Create a model from the schema
const Room = mongoose.model('Room', roomSchema);

// Export the model
export default Room;
