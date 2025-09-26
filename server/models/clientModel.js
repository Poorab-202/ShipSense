import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },

    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },

    idType: { type: String, enum: ["Aadhar", "Passport", "DriverLicense", "Other"], default: "Aadhar" },
    idNumber: { type: String },
},
    {
        timestamps: true
    });

const Client = mongoose.model('Client', clientSchema);
export default Client;