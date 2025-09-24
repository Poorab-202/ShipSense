import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        contactNumber: { type: String },
        address: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: { type: String, default: "India" },
        },
        role: {
            type: String,
            enum: ["Admin", "LogisticsManager", "DeliveryAgent", "Customer"],
            default: "Customer",
        },
    },
    { timestamps: true }
);


userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
