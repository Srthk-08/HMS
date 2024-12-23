import express from 'express';
import FloorController from '../controllers/floorController.mjs';

const router = express.Router();

router.post('/floors', FloorController.createFloor);
router.get('/floors', FloorController.getFloors);
router.get('/floors/:id', FloorController.getFloorById);
router.put('/floors/:id', FloorController.updateFloor);
router.delete('/floors/:id', FloorController.deleteFloor);

export default router;
