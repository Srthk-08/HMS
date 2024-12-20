import Hostel from "../models/Hostel.mjs";

class HostelController {
  // Create a new Hostel
  async createHostel(req, res) {
    try {
      const { Hostel_name, No_of_Floors, Hostel_Address, Admin_id } = req.body;

      // Validate required fields
      if (!Hostel_name || !No_of_Floors || !Admin_id) {
        return res.status(400).json({ message: 'Hostel_name, No_of_Floors, and Admin_id are required' });
      }

      const newHostel = new Hostel({
        Hostel_name,
        No_of_Floors,
        Hostel_Address,
        Admin_id,
      });

      const savedHostel = await newHostel.save();
      res.status(201).json({ message: 'Hostel created successfully', hostel: savedHostel });
    } catch (error) {
      res.status(500).json({ message: 'Error creating hostel', error });
    }
  }

  // Get all Hostels
  async getHostels(req, res) {
    try {
      const hostels = await Hostel.find().populate('Admin_id');
      res.status(200).json(hostels);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching hostels', error });
    }
  }

  // Get a single Hostel by ID
  async getHostelById(req, res) {
    try {
      const { id } = req.params;
      const hostel = await Hostel.findById(id).populate('Admin_id');

      if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
      }

      res.status(200).json(hostel);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching hostel', error });
    }
  }

  // Update a Hostel by ID
  async updateHostel(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedHostel = await Hostel.findByIdAndUpdate(id, updates, { new: true }).populate('Admin_id');
      if (!updatedHostel) {
        return res.status(404).json({ message: 'Hostel not found' });
      }

      res.status(200).json({ message: 'Hostel updated successfully', hostel: updatedHostel });
    } catch (error) {
      res.status(500).json({ message: 'Error updating hostel', error });
    }
  }

  // Delete a Hostel by ID
  async deleteHostel(req, res) {
    try {
      const { id } = req.params;

      const deletedHostel = await Hostel.findByIdAndDelete(id);
      if (!deletedHostel) {
        return res.status(404).json({ message: 'Hostel not found' });
      }

      res.status(200).json({ message: 'Hostel deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting hostel', error });
    }
  }
}

export default new HostelController();
