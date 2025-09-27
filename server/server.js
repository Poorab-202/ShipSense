import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './utils/connectDB.js';
import dotenv from 'dotenv';
import ShipmentRoutes from "./routes/shipmentRoutes.js"
import WarehouseRoutes from './routes/warehouseRoutes.js';
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


await connectDB();


app.use("/api/shipment", ShipmentRoutes);
app.use("/api/warehouse", WarehouseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server running at - ", PORT);
})