import Warehouse from "../models/warehouseModel.js";
import User from "../models/UserModel.js";

export const addWarehouse = async (req, res) => {
    try {
        const { name, location, capacity, manager } = req.body;

        
        const warehouse = new Warehouse({
            name,
            location,
            capacity,
            manager,
        });
        await warehouse.save();

   
        if (manager) {
            await User.findByIdAndUpdate(manager, { warehouse: warehouse._id });
        }

        res.status(201).json({ success: true, data: warehouse });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};



export const getWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.find()
            .populate("manager", "name email")
            .populate("staff", "name email");
        res.status(200).json({ success: true, data: warehouses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const getWarehouseById = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id)
            .populate("manager", "name email")
            .populate("staff", "name email");

        if (!warehouse) {
            return res
                .status(404)
                .json({ success: false, message: "Warehouse not found" });
        }

        res.status(200).json({ success: true, data: warehouse });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const updateWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!warehouse) {
            return res
                .status(404)
                .json({ success: false, message: "Warehouse not found" });
        }

        res.status(200).json({ success: true, data: warehouse });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const assignUserToWarehouse = async (req, res) => {
    try {
        const { warehouseId, userId, role } = req.body;

        if (!warehouseId || !userId) {
            return res.status(400).json({ success: false, message: "Warehouse ID and User ID are required" });
        }

        const warehouse = await Warehouse.findById(warehouseId);
        if (!warehouse) {
            return res.status(404).json({ success: false, message: "Warehouse not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        
        user.warehouse = warehouse._id;
        await user.save();

       
        if (role === "Manager") {
            warehouse.manager = user._id;
        }

     
        if (role === "WarehouseStaff") {
            if (!warehouse.staff.includes(user._id)) {
                warehouse.staff.push(user._id);
            }
        }

        await warehouse.save();

        res.json({
            success: true,
            message: "User assigned to warehouse successfully",
            data: { warehouse, user },
        });
    } catch (err) {
        console.error("Error assigning user to warehouse:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};


export const deleteWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.findByIdAndDelete(req.params.id);

        if (!warehouse) {
            return res
                .status(404)
                .json({ success: false, message: "Warehouse not found" });
        }

        res.status(200).json({ success: true, message: "Warehouse deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const getWarehouseStats = async (req, res) => {
    try {
        const warehouses = await Warehouse.find();

        const stats = {
            total: warehouses.length,
            availableCapacity: warehouses.reduce(
                (sum, wh) => sum + (wh.capacity - wh.usedCapacity),
                0
            ),
            nearingFull: warehouses.filter(
                (wh) => wh.usedCapacity / wh.capacity >= 0.75
            ).length,
            nearlyEmpty: warehouses.filter(
                (wh) => wh.usedCapacity / wh.capacity <= 0.25
            ).length,
        };

        res.status(200).json({ success: true, data: stats });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
