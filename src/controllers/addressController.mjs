// controllers/AddressController.mjs
import Address from '../models/HostelAddress.mjs';

class AddressController {
  // Create a new Address
  async createAddress(req, res) {
    try {
      const { hostelId, street, city, state, pincode, district, country } = req.body;

      // Validate required fields
      if (!hostelId || !street || !city || !state || !pincode || !district || !country) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newAddress = new Address({
        hostelId,
        street,
        city,
        state,
        pincode,
        district,
        country
      });

      const savedAddress = await newAddress.save();
      res.status(201).json({ message: 'Address created successfully', address: savedAddress });
    } catch (error) {
      res.status(500).json({ message: 'Error creating address', error });
    }
  }

  // Get all Addresses
  async getAddresses(req, res) {
    try {
      const addresses = await Address.find().populate('hostelId');
      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching addresses', error });
    }
  }

  // Get a single Address by ID
  async getAddressById(req, res) {
    try {
      const { id } = req.params;
      const address = await Address.findById(id).populate('hostelId');

      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }

      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching address', error });
    }
  }

  // Update an Address by ID
  async updateAddress(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedAddress = await Address.findByIdAndUpdate(id, updates, { new: true }).populate('hostelId');
      if (!updatedAddress) {
        return res.status(404).json({ message: 'Address not found' });
      }

      res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
    } catch (error) {
      res.status(500).json({ message: 'Error updating address', error });
    }
  }

  // Delete an Address by ID
  async deleteAddress(req, res) {
    try {
      const { id } = req.params;

      const deletedAddress = await Address.findByIdAndDelete(id);
      if (!deletedAddress) {
        return res.status(404).json({ message: 'Address not found' });
      }

      res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting address', error });
    }
  }
}

export default new AddressController();
