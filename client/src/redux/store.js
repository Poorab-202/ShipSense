import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "./slice/shipmentSlice";
import warehouseReducer from "./slice/warehouseSlice"

const store = configureStore({
    reducer: {
        shipments: shipmentReducer,
        warehouses: warehouseReducer
    },
});

export default store;
