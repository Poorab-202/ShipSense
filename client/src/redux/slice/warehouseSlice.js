import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byId: {},
    allIds: [],
    stats: null,
    loading: false,
    error: null,
};

const warehouseSlice = createSlice({
    name: "warehouses",
    initialState,
    reducers: {
        setWarehouses: (state, action) => {
            state.byId = {};
            state.allIds = [];
            action.payload.forEach((wh) => {
                state.byId[wh._id] = wh;
                state.allIds.push(wh._id);
            });
            state.loading = false;
            state.error = null;
        },
        addWarehouse: (state, action) => {
            const wh = action.payload;
            state.byId[wh._id] = wh;
            state.allIds.push(wh._id);
        },
        updateWarehouse: (state, action) => {
            const wh = action.payload;
            if (state.byId[wh._id]) {
                state.byId[wh._id] = { ...state.byId[wh._id], ...wh };
            }
        },
        deleteWarehouse: (state, action) => {
            const id = action.payload;
            delete state.byId[id];
            state.allIds = state.allIds.filter((whId) => whId !== id);
        },
        setStats: (state, action) => {
            state.stats = action.payload;
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
    setWarehouses,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse,
    setStats,
    setLoading,
    setError,
} = warehouseSlice.actions;

export default warehouseSlice.reducer;
