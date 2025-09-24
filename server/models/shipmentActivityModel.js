import mongoose from 'mongoose';

const shipmentActivitySchema = new mongoose.Schema(
  {
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
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
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    remarks: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShipmentActivity", shipmentActivitySchema);
