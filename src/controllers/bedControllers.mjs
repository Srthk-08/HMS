import Bed from '../models/Bed.mjs';

class BedController {
  // Create a new bed
  async createBed(req, res) {
    try {
      const { Bad_no, Room_id, Floor_no, is_Alloted, Bed_Rent, Student_Id } = req.body;

      // Validate the request body
      if (!Bad_no || !Room_id || Floor_no === undefined) {
        return res.status(400).json({ message: 'Bad_no, Room_id, and Floor_no are required' });
      }

      const newBed = new Bed({
        Bad_no,
        Room_id,
        Floor_no,
        is_Alloted: is_Alloted || false,
        Bed_Rent,
        Student_Id: Student_Id || null,
      });

      const savedBed = await newBed.save();
      res.status(201).json({ message: 'Bed created successfully', bed: savedBed });
    } catch (error) {
      res.status(500).json({ message: 'Error creating bed', error });
    }
  }

  // Get all beds
  async getBeds(req, res) {
    try {
      const beds = await Bed.find().populate('Room_id').populate('Student_Id');
      res.status(200).json(beds);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching beds', error });
    }
  }

  // Get a single bed by ID
  async getBedById(req, res) {
    try {
      const { id } = req.params;
      const bed = await Bed.findById(id).populate('Room_id').populate('Student_Id');

      if (!bed) {
        return res.status(404).json({ message: 'Bed not found' });
      }

      res.status(200).json(bed);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bed', error });
    }
  }

  // Update a bed by ID
  async updateBed(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedBed = await Bed.findByIdAndUpdate(id, updates, { new: true }).populate('Room_id').populate('Student_Id');
      if (!updatedBed) {
        return res.status(404).json({ message: 'Bed not found' });
      }

      res.status(200).json({ message: 'Bed updated successfully', bed: updatedBed });
    } catch (error) {
      res.status(500).json({ message: 'Error updating bed', error });
    }
  }

  // Delete a bed by ID
  async deleteBed(req, res) {
    try {
      const { id } = req.params;

      const deletedBed = await Bed.findByIdAndDelete(id);
      if (!deletedBed) {
        return res.status(404).json({ message: 'Bed not found' });
      }

      res.status(200).json({ message: 'Bed deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting bed', error });
    }
  }
}

export default new BedController();
