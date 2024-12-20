import express from 'express';
import AddressController from '../controllers/addressController.mjs';

const router = express.Router();

router.post('/', AddressController.createAddress);
router.get('/', AddressController.getAddresses);
router.get('/:id', AddressController.getAddressById);
router.put('/:id', AddressController.updateAddress);
router.delete('/:id', AddressController.deleteAddress);

export default router;
