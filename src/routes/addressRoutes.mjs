import express from 'express';
import AddressController from '../controllers/addressController.mjs';
import validateJwt from '../middlewares/validateJwt.mjs';

const router = express.Router();

router.post('/', validateJwt,AddressController.createAddress);
router.get('/', validateJwt,AddressController.getAddresses);
router.get('/:id', validateJwt,AddressController.getAddressById);
router.put('/:id', validateJwt,AddressController.updateAddress);
router.delete('/:id', validateJwt,AddressController.deleteAddress);

export default router;
