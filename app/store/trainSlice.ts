// store/trainSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const trainSlice = createSlice({
  name: "trains",
  initialState: {
    trains: [],
    loading: false,
  },
  reducers: {
    setTrains: (state, action) => {
      state.trains = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setTrains, setLoading } = trainSlice.actions;
export default trainSlice.reducer;
