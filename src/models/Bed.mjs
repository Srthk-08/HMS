import mongoose from "mongoose";

// Define the bed schema
const bedSchema = new mongoose.Schema({
    Bed_no:{type:Number
           ,required:true
    },
  Room_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Room collection
    ref: 'Room', // Reference to the Room model
    required: true
  },
  Floor_no: {
    type: Number, // Floor number the bed is located on
    required: true
  },
  is_Alloted: {
    type: Boolean, // Whether the bed is allotted to a student or not
    default: false, // Default to false (i.e., bed is not alloted)
    required: true
  },
  Bed_Rent: {
    type: Number, // Rent for the bed
    required: false
  },
  Student_Id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Student collection
    ref: 'Student', // Reference to the Student model
    required: false, // Student_Id is not required until the bed is allotted
    default: null // Default is null if the bed is not allotted
  }
});

// Create a model from the schema
const Bed = mongoose.model('Bed', bedSchema);

// Export the model
export default Bed
