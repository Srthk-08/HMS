import Floor from '../models/Floor.mjs';

class FloorController {
  // Create a new Floor
  async createFloor(req, res) {
    try {
      const { Floor_no, Hostel_id, No_of_Rooms, Floor_Rent, No_of_Washrooms, No_of_Kitchens } = req.body;

      // Validate required fields
      if (!Floor_no || !Hostel_id) {
        return res.status(400).json({ message: 'Floor_no and Hostel_id are required' });
      }

      const newFloor = new Floor({
        Floor_no,
        Hostel_id,
        No_of_Rooms,
        Floor_Rent,
        No_of_Washrooms,
        No_of_Kitchens,
      });

      const savedFloor = await newFloor.save();
      res.status(201).json({ message: 'Floor created successfully', floor: savedFloor });
    } catch (error) {
      res.status(500).json({ message: 'Error creating floor', error });
    }
  }

  // Get all Floors
  async getFloors(req, res) {
    try {
      const floors = await Floor.find().populate('Hostel_id');
      res.status(200).json(floors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching floors', error });
    }
  }

  // Get a single Floor by ID
  async getFloorById(req, res) {
    try {
      const { id } = req.params;
      const floor = await Floor.findById(id).populate('Hostel_id');

      if (!floor) {
        return res.status(404).json({ message: 'Floor not found' });
      }

      res.status(200).json(floor);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching floor', error });
    }
  }

  // Update a Floor by ID
  async updateFloor(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedFloor = await Floor.findByIdAndUpdate(id, updates, { new: true }).populate('Hostel_id');
      if (!updatedFloor) {
        return res.status(404).json({ message: 'Floor not found' });
      }

      res.status(200).json({ message: 'Floor updated successfully', floor: updatedFloor });
    } catch (error) {
      res.status(500).json({ message: 'Error updating floor', error });
    }
  }

  // Delete a Floor by ID
  async deleteFloor(req, res) {
    try {
      const { id } = req.params;

      const deletedFloor = await Floor.findByIdAndDelete(id);
      if (!deletedFloor) {
        return res.status(404).json({ message: 'Floor not found' });
      }

      res.status(200).json({ message: 'Floor deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting floor', error });
    }
  }
}

export default new FloorController();
