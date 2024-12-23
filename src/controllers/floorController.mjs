import Floor from '../models/Floor.mjs';
import Room from '../models/Room.mjs';
import Hostel from '../models/Hostel.mjs';

class FloorController {
  // Create a new Floor
  async createFloor(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { Floor_no, Hostel_id, No_of_Rooms, Floor_Rent, No_of_Washrooms, No_of_Kitchens } = req.body;

      // Validate required fields
      if (!Floor_no || !Hostel_id || !No_of_Rooms) {
        return res.status(400).json({ message: 'Floor_no, Hostel_id, and No_of_Rooms are required' });
      }

      // Create floor
      const newFloor = new Floor({
        Floor_no,
        Hostel_id,
        No_of_Rooms,
        Floor_Rent,
        No_of_Washrooms,
        No_of_Kitchens,
      });
      const savedFloor = await newFloor.save({ session });

      // Create rooms if specified
      if (No_of_Rooms > 0) {
        const roomData = Array.from({ length: No_of_Rooms }, (_, index) => ({
          Room_no: index + 1,
          Floor_no: savedFloor.Floor_no,
          Floor_id: savedFloor._id,
          is_Full: false,
        }));

        await Room.insertMany(roomData, { session });
      }

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        success: true,
        message: 'Floor and rooms added successfully',
        data: savedFloor,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Error creating floor:', error);

      res.status(500).json({
        success: false,
        message: 'Error creating floor',
        error: error.message,
      });
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
  
      // Handle rooms based on updated No_of_Rooms
      if (updates.No_of_Rooms) {
        const existingRooms = await Room.find({ Floor_id: id });
        const existingRoomCount = existingRooms.length;
        const updatedRoomCount = updates.No_of_Rooms;
  
        // Add rooms if No_of_Rooms has increased
        if (updatedRoomCount > existingRoomCount) {
          const newRooms = Array.from(
            { length: updatedRoomCount - existingRoomCount },
            (_, index) => ({
              Room_no: existingRoomCount + index + 1,
              Floor_no: updatedFloor.Floor_no,
              Floor_id: updatedFloor._id,
              is_Full: false,
            })
          );
  
          await Room.insertMany(newRooms);
        }
  
        // Remove rooms if No_of_Rooms has decreased
        // if (updatedRoomCount < existingRoomCount) {
        //   const roomsToDelete = existingRooms
        //     .filter((room) => room.Room_no > updatedRoomCount)
        //     .map((room) => room._id);
  
        //   await Room.deleteMany({ _id: { $in: roomsToDelete } });
        // }
      }
  
      res.status(200).json({
        message: 'Floor and rooms updated successfully',
        floor: updatedFloor,
      });
    } catch (error) {
      console.error('Error updating floor:', error);
      res.status(500).json({ message: 'Error updating floor', error: error.message });
    }
  }
  

  // Delete a Floor by ID
  async deleteFloor(req, res) {
    try {
      const { id } = req.params;
  
      // Delete the floor
      const deletedFloor = await Floor.findByIdAndDelete(id);
      if (!deletedFloor) {
        return res.status(404).json({ message: 'Floor not found' });
      }
  
      // Delete associated rooms
      await Room.deleteMany({ Floor_id: id });
  
      // Update the hostel's floor count
      try {
        const hostel = await Hostel.findById(deletedFloor.Hostel_id);
        if (hostel) {
          await Hostel.findByIdAndUpdate(
            deletedFloor.Hostel_id,
            { No_of_Floors: hostel.No_of_Floors - 1 },
            { new: true }
          );
        }
      } catch (err) {
        console.error('Error updating hostel:', err);
        return res.status(500).json({
          message: 'Floor deleted, but failed to update hostel',
          error: err.message,
        });
      }
  
      res.status(200).json({ message: 'Floor and associated rooms deleted successfully' });
    } catch (error) {
      console.error('Error deleting floor:', error);
      res.status(500).json({ message: 'Error deleting floor', error: error.message });
    }
  }
}

export default new FloorController();
