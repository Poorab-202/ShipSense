import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        capacity: { type: Number, required: true },
        currentLoad: { type: Number, default: 0 },
        address: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: { type: String, default: "India" },
        },
        manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const Warehouse = mongoose.model("Warehouse", warehouseSchema);
export default Warehouse;
