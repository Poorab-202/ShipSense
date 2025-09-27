import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},     // { shipmentId: shipmentObject }
  allIds: [],   // [shipmentId1, shipmentId2, ...]
  loading: false,
  error: null,
};

const shipmentSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    setShipments: (state, action) => {
      state.byId = {};
      state.allIds = [];
      action.payload.forEach((shipment) => {
        state.byId[shipment._id] = shipment;
        state.allIds.push(shipment._id);
      });
    },
    addShipment: (state, action) => {
      const shipment = action.payload;
      state.byId[shipment._id] = shipment;
      state.allIds.push(shipment._id);
    },
    updateShipment: (state, action) => {
      const shipment = action.payload;
      if (state.byId[shipment._id]) {
        state.byId[shipment._id] = shipment; // replace with updated version
      }
    },
    addShipmentActivity: (state, action) => {
      const { id, activity } = action.payload;
      if (state.byId[id]) {
        state.byId[id].activities = [
          ...(state.byId[id].activities || []),
          activity,
        ];
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setShipments,
  addShipment,
  updateShipment,
  addShipmentActivity,
  setLoading,
  setError,
} = shipmentSlice.actions;

export default shipmentSlice.reducer;
