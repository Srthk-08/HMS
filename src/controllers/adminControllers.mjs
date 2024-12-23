// controllers/AdminController.mjs
import dotenv from "dotenv"
dotenv.config();
import bcrypt from 'bcryptjs';
import Admin from '../models/AdminModel.mjs';
import jwt from "jsonwebtoken"

const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'qwertyuiop'; // Replace with a secure key in production

// Create a new Admin
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate the request body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for duplicate email
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin Email already exists' });
    }

    // Hash the password using bcrypt before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newAdmin._id, email: newAdmin.email }, ADMIN_TOKEN_SECRET, { expiresIn: '24h' });

    res.status(201).json({ message: 'Admin created successfully', admin: newAdmin, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating admin', error });
  }
};

// Get all Admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching admins', error });
  }
};

// Get a single Admin by ID
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching admin', error });
  }
};

// Update an Admin by ID
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
      // Hash the new password if it's part of the update
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating admin', error });
  }
};

// Delete an Admin by ID
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting admin', error });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the request body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id, email: admin.email }, ADMIN_TOKEN_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

