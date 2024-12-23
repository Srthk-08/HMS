import Room from "./Room.mjs";
import Hostel from "./Hostel.mjs";
import mongoose from "mongoose";

// Define the floor schema
const floorSchema = new mongoose.Schema(
  {
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
}
);

floorSchema.post("save", async function (doc) {
  try {
    if (doc.No_of_Rooms > 0) {
      const newRooms = Array.from({ length: doc.No_of_Rooms }, (_, index) => ({
      
          Room_no: index + 1,
          Floor_no: doc._id,
          Floor_id: doc.Floor_no,
      }));

      const createdBeds = await Bed.insertMany(newBeds);
      console.log(`${createdBeds.length} beds added for room ${doc.Room_no}`);
    }
  } catch (err) {
    console.error("Error creating beds:", err);
  }
});

floorSchema.pre("findOneAndDelete", async function (next) {
  try {
    // Fetch the document being deleted
    const doc = await this.model.findOne(this.getQuery());
     
    // Check if the document exists
    if (!doc) {
      return next(new Error("Floor not found"));
    }

    // Delete related rooms if the floor has rooms
    if (doc.No_of_Rooms > 0) {
      const deletedRooms = await Room.deleteMany({ Floor_id: doc._id });
      console.log(`${deletedRooms.deletedCount} rooms deleted.`);
    }

    // Update the Hostel by decrementing the number of floors
    const updateHostel = await Hostel.findByIdAndUpdate(
      doc.Hostel_id,
      { $inc: { No_of_Floors: -1 } },
      { new: true } // This will return the updated document
    );

    if (!updateHostel) {
      return next(new Error("Hostel not found or update failed"));
    }

    console.log(`Hostel updated: ${updateHostel.No_of_Floors} floors remaining.`);

    next(); // Proceed with the delete operation

  } catch (err) {
    console.error("Error in pre-delete middleware:", err);
    next(err); // Pass the error to the next middleware for handling
  }
});


floorSchema.pre("deleteMany", async function (next) {
  try {
    // Fetch the document being deleted
    const doc = await this.model.findOne(this.getQuery());

    // Check if the document exists
    if (!doc) {
      return next(new Error("Floor not found"));
    }

    // Delete related rooms if the floor has rooms
    if (doc.No_of_Rooms > 0) {
      const deletedRooms = await Room.deleteMany({ Floor_id: doc._id });
      console.log(`${deletedRooms.deletedCount} rooms deleted.`);
    }

    // Update the Hostel by decrementing the number of floors
    // const updateHostel = await Hostel.findByIdAndUpdate(
    //   doc.Hostel_id,
    //   { $inc: { No_of_Floors: -1 } },
    //   { new: true } // This will return the updated document
    // );

    // if (!updateHostel) {
    //   return next(new Error("Hostel not found or update failed"));
    // }

    // console.log(`Hostel updated: ${updateHostel.No_of_Floors} floors remaining.`);

    next(); // Proceed with the delete operation

  } catch (err) {
    console.error("Error in pre-delete middleware:", err);
    next(err); // Pass the error to the next middleware for handling
  }
});

  


// Create a model from the schema
const Floor = mongoose.model('Floor', floorSchema);

// Export the model
export default Floor;
