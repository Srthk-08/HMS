import express from "express";
import HostelController from "../controllers/hostelControllers.mjs";
import validateJwt from "../middlewares/validateJwt.mjs";

const router = express.Router();

router.post('/create', validateJwt ,HostelController.createHostel);
router.get('/get', validateJwt, HostelController.getHostels);
router.get('/:id', validateJwt, HostelController.getHostelById);
router.put('/:id', validateJwt, HostelController.updateHostel);
router.delete('/:id', validateJwt, HostelController.deleteHostel);

export default router
