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


router.post("/add", addWarehouse);


router.get("/", getWarehouses);


router.get("/stats", getWarehouseStats);

router.get("/:id", getWarehouseById);


router.put("/:id", updateWarehouse);


router.delete("/:id", deleteWarehouse);
router.post("/assignUser", assignUserToWarehouse);

export default router;
