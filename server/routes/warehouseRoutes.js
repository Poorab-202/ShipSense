import express from "express";
import {
    addWarehouse,
    getWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse,
    getWarehouseStats,
    assignUserToWarehouse,
} from "../controllers/warehouseControllers.js";

const router = express.Router();

// Create new warehouse
router.post("/add", addWarehouse);

// Get all warehouses
router.get("/", getWarehouses);

// Get stats (total, available capacity, nearing full, etc.)
router.get("/stats", getWarehouseStats);

// Get single warehouse by ID
router.get("/:id", getWarehouseById);

// Update warehouse
router.put("/:id", updateWarehouse);

// Delete warehouse
router.delete("/:id", deleteWarehouse);
router.post("/assignUser", assignUserToWarehouse);

export default router;
