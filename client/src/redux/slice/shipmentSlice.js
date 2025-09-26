import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shipments: []
}


const shipmentSlice = createSlice({
    name: "Shipment",
    initialState,
    reducers: {
        setShipments: (state, action) => {
            state.shipments = action.payload;
        }
    }
})


export const { setShipments } = shipmentSlice.actions;
export default shipmentSlice.reducer;