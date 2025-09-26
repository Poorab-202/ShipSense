import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, unique: true },
    description: { type: String },
    weight: { type: Number },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "ShipmentActivity" }], // timeline
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    pickupDate: { type: Date },
    expectedDeliveryDate: { type: Date },
    deliveryDate: { type: Date },
  },
  { timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);
export default Shipment;
