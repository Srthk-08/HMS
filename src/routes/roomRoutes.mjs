// routes/roomRoutes.mjs
import express from 'express';
import RoomController from '../controllers/roomControllers.mjs';

const router = express.Router();

router.post('/', RoomController.createRoom);
router.get('/', RoomController.getRooms);
router.get('/:id', RoomController.getRoomById);
router.put('/:id', RoomController.updateRoom);
router.delete('/:id', RoomController.deleteRoom);

export default router;
