import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            address: { type: String, required: true },
            city: { type: String },
            state: { type: String },
            country: { type: String },
            coordinates: {
                lat: { type: Number, required: true },
                lng: { type: Number, required: true }
            }
        },
        capacity: {
            type: Number, // total capacity (e.g., in pallets, units, or cubic meters)
            required: true,
            min: 0,
        },
        usedCapacity: {
            type: Number, // how much is currently used
            default: 0,
            min: 0,
        },
        inventory: [
            {
                itemName: { type: String, required: true },
                quantity: { type: Number, required: true, min: 0 },
                unit: { type: String, default: "units" }, // e.g., boxes, pallets, kg
            },
        ],
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        staff: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        status: {
            type: String,
            enum: ["Nearly Empty", "Normal", "Nearing Full", "Full"],
            default: "Normal",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Warehouse", warehouseSchema);
