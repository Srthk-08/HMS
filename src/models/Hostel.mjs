import Floor from "./Floor.mjs";
import mongoose from "mongoose";

// Define the hostel schema
const hostelSchema = new mongoose.Schema({
  Hostel_name: {
    type: String,
    required: true,
  },
  No_of_Floors: {
    type: Number,
    required: true,
    min: [1, "Number of floors must be at least 1"],
  },
  Admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

// Ensure Admin exists before saving
hostelSchema.pre("save", async function(next) {
  const adminExists = await mongoose.model("Admin").exists({ _id: this.Admin_id });
  if (!adminExists) {
    return next(new Error("Admin with the given ID does not exist"));
  }
  next();
});

// Add floors after saving a hostel
hostelSchema.post("save", async function(doc) {
  try {
    const newFloors = Array.from({ length: doc.No_of_Floors }, (_, index) => ({
      Floor_no: index + 1,
      Hostel_id: doc._id,
    }));
    await Floor.insertMany(newFloors);
    console.log(`${newFloors.length} floors added for hostel ${doc.Hostel_name}`);
  } catch (error) {
    console.error("Error adding floors:", error);
  }
});

// Delete related floors when hostel is deleted
hostelSchema.post("deleteMany", async function(query) {
  try {
    const { _id } = query.getFilter();
    const deletedFloors = await Floor.deleteMany({ Hostel_id: _id });
    console.log(`${deletedFloors.deletedCount} related floors deleted.`);
  } catch (error) {
    console.error("Error deleting related floors:", error);
  }
});

hostelSchema.post("findOneAndDelete", async function(doc) {
  if (doc) {
    const deletedFloors = await Floor.deleteMany({ Hostel_id: doc._id });
    console.log(`${deletedFloors.deletedCount} related floors deleted.`);
  }
});

// Create a model from the schema
const Hostel = mongoose.model("Hostel", hostelSchema);

// Export the model
export default Hostel;
