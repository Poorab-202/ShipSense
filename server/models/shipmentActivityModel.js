import mongoose from "mongoose";

const shipmentActivitySchema = new mongoose.Schema(
  {
    shipment: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment", required: true },
    status: {
      type: String,
      enum: [
        "Pending Pickup",
        "Picked Up",
        "In Transit",
        "Arrived at Hub",
        "Out for Delivery",
        "Delivered",
        "Delayed",
        "Cancelled",
      ],
      required: true,
    },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    remarks: { type: String },
  },
  { timestamps: true }
);

const ShipmentActivity = mongoose.model("ShipmentActivity", shipmentActivitySchema);
export default ShipmentActivity;
