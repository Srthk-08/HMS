
import express from 'express';
import { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } from '../controllers/adminControllers.mjs';
import adminValidator from '../middlewares/validateAdmin.mjs';
import validateJwt from '../middlewares/validateJwt.mjs';

const router = express.Router();

router.post('/register', adminValidator, createAdmin);
router.post('/login', adminValidator, createAdmin);
router.get('/', validateJwt ,getAdmins);
router.get('/:id', validateJwt, getAdminById);
router.put('/:id', validateJwt, updateAdmin);
router.delete('/:id', validateJwt, deleteAdmin);

export default router;
