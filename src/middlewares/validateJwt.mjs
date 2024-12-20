import jwt from "jsonwebtoken";
import { Admin } from "../models/adminModel.js";

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);

    // Check if the admin exists
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Invalid token.",
      });
    }

    // Attach the admin to the request object
    req.admin = admin;
    next();
  } catch (err) {
    console.error("JWT validation error:", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default adminAuthMiddleware;
