import Bed from "./Bed.mjs";
import mongoose from "mongoose";
import Floor from "./Floor.mjs";

// Define the room schema
const roomSchema = new mongoose.Schema({
  Room_no: {
    type: String,
    required: true,
  },
  Floor_no: {
    type: Number,
    required: true,
  },
  Floor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor",
    required: true,
  },
  is_Full: {
    type: Boolean,
    required: true,
    default: false,
  },
  No_of_Beds: {
    type: Number,
    required: false,
  },
  Room_rent: {
    type: Number,
    required: false,
  },
  No_of_Kitchens: {
    type: Number,
    required: false,
  },
  No_of_Washrooms: {
    type: Number,
    required: false,
  },
  Admin_Id : {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Admin',
    required: false
  }
});


// Middleware to create beds after saving a room
roomSchema.post("save", async function (doc) {
  try {
    if (doc.No_of_Beds > 0) {
      const newBeds = Array.from({ length: doc.No_of_Beds }, (_, index) => ({
        Bed_no: index + 1, 
        Room_id: doc._id,
        Floor_no: doc.Floor_no,
      }));

      const createdBeds = await Bed.insertMany(newBeds);
      console.log(`${createdBeds.length} beds added for room ${doc.Room_no}`);
    }
  } catch (err) {
    console.error("Error creating beds:", err);
  }
});

// Middleware to handle cascading operations when a room is deleted
roomSchema.pre("findOneAndDelete", async function (next) {
  try {
    const doc = await this.model.findOne(this.getQuery()); // Fetch the document being deleted
    if (doc) {
      // Delete all beds associated with the room
      if (doc.No_of_Beds > 0) {
        const deletedBeds = await Bed.deleteMany({ Room_id: doc._id });
        console.log(`${deletedBeds.deletedCount} beds deleted.`);
      }

      // Decrement the number of rooms in the associated floor
      await Floor.findByIdAndUpdate(doc.Floor_id, { $inc: { No_of_Rooms: -1 } });
      console.log("Floor room count updated.");
    }

    next();
  } catch (error) {
    console.error("Error in pre-delete middleware:", error);
    next(error); // Pass the error to the next middleware
  }
});


roomSchema.pre("deleteMany", async function (next) {
  try {
    const query = this.getQuery(); // Get the query conditions for deleteMany
    const docs = await this.model.find(query); // Find the documents matching the query

    for (const doc of docs) {
      // Delete associated beds for each room
      if (doc.No_of_Beds > 0) {
        const deletedBeds = await Bed.deleteMany({ Room_id: doc._id });
        console.log(`${deletedBeds.deletedCount} beds deleted for Room ${doc.Room_no}`);
      }

      // Update the floor to decrement the number of rooms
      await Floor.findByIdAndUpdate(doc.Floor_id, { $inc: { No_of_Rooms: -1 } });
      console.log(`Floor ${doc.Floor_id} room count updated.`);
    }

    next();
  } catch (error) {
    console.error("Error in deleteMany middleware:", error);
    next(error); // Pass the error to the next middleware
  }
});


// Create a model from the schema
const Room = mongoose.model("Room", roomSchema);

// Export the model
export default Room;
