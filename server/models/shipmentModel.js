import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema(
    {
        trackingId: {
            type: String,
            required: true,
            unique: true,
        },
        description: { type: String },
        weight: { type: Number },
        dimensions: {
            length: Number,
            width: Number,
            height: Number,
        },
        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ShipmentActivity"
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        pickupDate: { type: Date },
        expectedDeliveryDate: { type: Date },
        deliveryDate: { type: Date },
    },
    { timestamps: true }
);


const Shipment = mongoose.model('Package', shipmentSchema)

export default Shipment;