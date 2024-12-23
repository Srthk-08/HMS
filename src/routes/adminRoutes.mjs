
import express from 'express';
import { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin, loginAdmin } from '../controllers/adminControllers.mjs';
import validateAdminRegister from "../middlewares/validateAdmin.mjs";
import validateJwt from '../middlewares/validateJwt.mjs';

const router = express.Router();

router.post('/register', validateAdminRegister,createAdmin);
router.post('/login', loginAdmin);
router.get('/', validateJwt ,getAdmins);
router.get('/:id', validateJwt, getAdminById);
router.put('/:id', validateJwt, updateAdmin);
router.delete('/:id', validateJwt, deleteAdmin);

export default router;
