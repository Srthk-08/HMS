// routes/roomRoutes.mjs
import express from 'express';
import RoomController from '../controllers/roomControllers.mjs';

const router = express.Router();

router.post('/rooms', RoomController.createRoom);
router.get('/rooms', RoomController.getRooms);
router.get('/rooms/:id', RoomController.getRoomById);
router.put('/rooms/:id', RoomController.updateRoom);
router.delete('/rooms/:id', RoomController.deleteRoom);

export default router;
