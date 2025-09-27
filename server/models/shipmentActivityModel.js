import mongoose from "mongoose";

const shipmentActivitySchema = new mongoose.Schema(
  {
    shipment: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment", required: true },
    status: {
      type: String
    },
    Warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    remarks: { type: String },
  },
  { timestamps: true }
);

const ShipmentActivity = mongoose.model("ShipmentActivity", shipmentActivitySchema);
export default ShipmentActivity;
