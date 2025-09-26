import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './utils/connectDB.js';
import dotenv from 'dotenv';
import UniqueIdGenerator from './utils/uniqueIdGenerator.js';
import ShipmentRoutes from "./routes/shipmentRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));


await connectDB();


app.use(ShipmentRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server running at - ", PORT);
})