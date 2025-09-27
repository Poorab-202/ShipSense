import express from "express";
import {
    addShipment,
    getShipments,
    getShipmentById,
    updateShipment,
    updateShipmentStatus,
    deleteShipment,
    getTrackingId
} from "../controllers/shipmentControllers.js";

const router = express.Router();


router.post("/add", addShipment);
router.get("/getTrackingId", getTrackingId);  
router.get("/get", getShipments);
router.get("/:id", getShipmentById);
router.put("/:id", updateShipment);
router.put("/:id/status", updateShipmentStatus);
router.delete("/:id", deleteShipment);


export default router;
