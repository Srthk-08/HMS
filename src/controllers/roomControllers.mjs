import Room from '../models/Room.mjs';

class RoomController {
  // Create a new Room
  async createRoom(req, res) {
    try {
      const {
        Room_no,
        Floor_no,
        Floor_id,
        is_Full,
        No_of_Beds,
        Room_rent,
        No_of_Kitchens,
        No_of_Washrooms,
      } = req.body;

      // Validate required fields
      if (!Room_no || Floor_no === undefined || !Floor_id) {
        return res.status(400).json({ message: 'Room_no, Floor_no, and Floor_id are required' });
      }

      const newRoom = new Room({
        Room_no,
        Floor_no,
        Floor_id,
        is_Full: is_Full || false,
        No_of_Beds,
        Room_rent,
        No_of_Kitchens,
        No_of_Washrooms,
      });

      const savedRoom = await newRoom.save();
      res.status(201).json({ message: 'Room created successfully', room: savedRoom });
    } catch (error) {
      res.status(500).json({ message: 'Error creating room', error });
    }
  }

  // Get all Rooms
  async getRooms(req, res) {
    try {
      const rooms = await Room.find().populate('Floor_id');
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rooms', error });
    }
  }

  // Get a single Room by ID
  async getRoomById(req, res) {
    try {
      const { id } = req.params;
      const room = await Room.findById(id).populate('Floor_id');

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching room', error });
    }
  }

  // Update a Room by ID
  async updateRoom(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedRoom = await Room.findByIdAndUpdate(id, updates, { new: true }).populate('Floor_id');
      if (!updatedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }

      res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
    } catch (error) {
      res.status(500).json({ message: 'Error updating room', error });
    }
  }

  // Delete a Room by ID
  async deleteRoom(req, res) {
    try {
      const { id } = req.params;

      const deletedRoom = await Room.findByIdAndDelete(id);
      if (!deletedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }

      res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting room', error });
    }
  }
}

export default new RoomController();
