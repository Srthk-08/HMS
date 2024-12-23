import express from "express";
import connectDb from "./src/config/mongoDbConfig.mjs"; // MongoDB connection configuration
import bodyParser from "body-parser"; // Middleware to parse incoming request bodies
import morgan from "morgan"; // Middleware for logging HTTP requests
import cors from "cors"; // Middleware for handling Cross-Origin Resource Sharing
import adminRoutes from './src/routes/adminRoutes.mjs'; // Admin routes
import validateJwt from "./src/middlewares/validateJwt.mjs"; // Middleware to validate JWT

// Routes import
import bedRoutes from "./src/routes/bedRoutes.mjs"; // Routes for bed-related operations
import roomRoutes from './src/routes/roomRoutes.mjs'; // Routes for room-related operations
import addressRoutes from './src/routes/addressRoutes.mjs'; // Routes for address-related operations
import hostelRoutes from "./src/routes/hostelRoutes.mjs"; // Routes for hostel-related operations
import otpRoutes from "./src/routes/otpRoutes.mjs"; // Routes for OTP-related operations
import floorRoute from "./src/routes/floorRoutes.mjs"
const app = express();

// Middleware

// Logging HTTP requests using Morgan in 'combined' format
app.use(morgan('combined'));

// Parsing JSON request bodies
app.use(bodyParser.json());

// Parsing URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Handling Cross-Origin Resource Sharing
app.use(cors());

// Routes
import demoRoutes from "./src/routes/demoRoute.mjs"
//for code testing
app.use("/",demoRoutes)


// Admin routes
app.use('/api/admins', adminRoutes);

// OTP routes
app.use('/api/otp', otpRoutes);

// Address routes
app.use('/api/addresses', addressRoutes);

// Hostel routes
app.use('/api/hostel', hostelRoutes);

//floor
app.use("/api/floor",floorRoute)

// Room routes
app.use('/api/room', roomRoutes);

// Bed routes
app.use('/api/bed', bedRoutes);

// A simple root route with JWT authorization
app.get("/", (err,req, res,next) => {
    console.log("globle errore handler")
    res.send({error:err});
});

// Connect to the database
connectDb();

// Start the server
const PORT = process.env.PORT || 3000; // Use the PORT from environment variables or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
