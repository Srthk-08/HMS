import express from "express"
import HostelController from "../controllers/hostelControllers.mjs"

const router = express.Router();

router.post('/hostels', HostelController.createHostel);
router.get('/hostels', HostelController.getHostels);
router.get('/hostels/:id', HostelController.getHostelById);
router.put('/hostels/:id', HostelController.updateHostel);
router.delete('/hostels/:id', HostelController.deleteHostel);

export default router
