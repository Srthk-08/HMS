
import express from 'express';
import { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } from '../controllers/adminControllers.mjs';
import adminValidator from '../middlewares/validateAdmin.mjs';

const router = express.Router();

router.post('/', adminValidator, createAdmin);
router.get('/', getAdmins);
router.get('/:id', getAdminById);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;
