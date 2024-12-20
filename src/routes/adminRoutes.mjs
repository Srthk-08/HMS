// routes/adminRoutes.mjs
import express from 'express';
import { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } from '../controllers/adminControllers.mjs';

const router = express.Router();

router.post('/admins', createAdmin);
router.get('/admins', getAdmins);
router.get('/admins/:id', getAdminById);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);

export default router;
