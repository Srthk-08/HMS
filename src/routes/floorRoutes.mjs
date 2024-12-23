import express from 'express';
import FloorController from '../controllers/floorController.mjs';
import validateJwt from '../middlewares/validateJwt.mjs'

const router = express.Router();
router.use(validateJwt);
router.post('/', FloorController.createFloor);
router.get('/', FloorController.getFloors);
router.get('/:id', FloorController.getFloorById);
router.put('/:id', FloorController.updateFloor);
router.delete('/:id', FloorController.deleteFloor);

export default router;
