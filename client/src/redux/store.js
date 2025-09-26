import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "./slice/shipmentSlice"

const store = configureStore({
    reducer: {
        shipment: shipmentReducer
    }
})



export default store;