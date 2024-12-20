import express from 'express';
import BedController from '../controllers/bedControllers.mjs';

const router = express.Router();

router.post('/', BedController.createBed);
router.get('/', BedController.getBeds);
router.get('/:id', BedController.getBedById);
router.put('/:id', BedController.updateBed);
router.delete('/:id', BedController.deleteBed);

export default router;
