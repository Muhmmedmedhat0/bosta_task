import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shipmentData } from '../../../types/shipment.types';

// Define the initial state for your shipment slice
interface ShipmentState {
  data: shipmentData | null,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShipmentState = {
  data: null,
  loading: 'idle',
  error: null,
};

// Create an async thunk for fetching shipment data by tracking number
export const fetchShipmentByTrackingNumber = createAsyncThunk(
  'shipment/fetchByTrackingNumber',
  async (trackingNumber: number | undefined, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
        trackingNumber
          ? `https://tracking.bosta.co/shipments/track/${trackingNumber}`
          : `https://tracking.bosta.co/shipments/track/7234258`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error);
      throw error; // Throw the error to indicate the rejection
    }
  },
);

// Create the shipment slice
const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipmentByTrackingNumber.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchShipmentByTrackingNumber.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchShipmentByTrackingNumber.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default shipmentSlice.reducer;

// Export the async thunk for use in components
// export { fetchShipmentByTrackingNumber as fetchShipment };
