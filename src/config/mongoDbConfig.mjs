import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDb = async () => {
    const url = process.env.DB_URL || "mongodb://localhost:27017/hms";

    mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
    
};

// Gracefully close the database connection on app termination

export default connectDb;
