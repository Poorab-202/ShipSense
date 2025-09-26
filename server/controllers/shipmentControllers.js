import Shipment from "../models/shipmentModel.js";
import ShipmentActivity from "../models/shipmentActivityModel.js";
import Client from "../models/clientModel.js"



export const getTrackingId = async (req, res) => {
    try {
        const trackingId = await UniqueIdGenerator();
        res.status(200).json({
            trackingId: trackingId,
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false
        })
    }
}


export const addShipment = async (req, res) => {
    try {
        const { trackingId, description, weight, dimensions, pickupDate, sender, recipient } = req.body;


        const senderClient = new Client(sender);
        await senderClient.save();

        const recipientClient = new Client(recipient);
        await recipientClient.save();

        const expectedDeliveryDate = pickupDate
            ? new Date(new Date(pickupDate).setDate(new Date(pickupDate).getDate() + 5))
            : null;


        const shipment = new Shipment({
            trackingId,
            description,
            weight,
            dimensions,
            sender: senderClient._id,
            recipient: recipientClient._id,
            pickupDate,
            expectedDeliveryDate,
        });

        await shipment.save();

        res.status(201).json({ success: true, data: shipment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const getShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find()
            .populate("sender recipient", "name email contactNumber")
            .populate("activities");

        res.json({ success: true, data: shipments });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const getShipmentById = async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id)
            .populate("sender recipient", "name email contactNumber")
            .populate({
                path: "activities",
                populate: { path: "updatedBy", select: "name email" },
            });

        if (!shipment) {
            return res.status(404).json({ success: false, message: "Shipment not found" });
        }

        res.json({ success: true, data: shipment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const updateShipment = async (req, res) => {
    try {
        const {
            description,
            weight,
            dimensions,
            pickupDate,
            expectedDeliveryDate,
            deliveryDate,
        } = req.body;

        const shipment = await Shipment.findById(req.params.id);

        if (!shipment) {
            return res.status(404).json({ success: false, message: "Shipment not found" });
        }

        shipment.description = description || shipment.description;
        shipment.weight = weight || shipment.weight;
        shipment.dimensions = dimensions || shipment.dimensions;
        shipment.pickupDate = pickupDate || shipment.pickupDate;
        shipment.expectedDeliveryDate =
            expectedDeliveryDate || shipment.expectedDeliveryDate;
        shipment.deliveryDate = deliveryDate || shipment.deliveryDate;

        await shipment.save();
        res.json({ success: true, data: shipment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const updateShipmentStatus = async (req, res) => {
    try {
        const { status, location, updatedBy, remarks } = req.body;

        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) {
            return res.status(404).json({ success: false, message: "Shipment not found" });
        }

        const activity = new ShipmentActivity({
            shipment: shipment._id,
            status,
            location,
            updatedBy,
            remarks,
        });

        await activity.save();

        shipment.activities.push(activity._id);
        if (status === "Delivered") {
            shipment.deliveryDate = new Date();
        }
        await shipment.save();

        res.json({ success: true, message: "Status updated", data: activity });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const deleteShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) {
            return res.status(404).json({ success: false, message: "Shipment not found" });
        }

        await ShipmentActivity.deleteMany({ shipment: shipment._id });
        await shipment.deleteOne();

        res.json({ success: true, message: "Shipment deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
