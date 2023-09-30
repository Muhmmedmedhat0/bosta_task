import { configureStore } from '@reduxjs/toolkit';
import language from './features/language/language-slice';
import shipment from './features/shipments/shipment-slice';

export const store = configureStore({
  reducer: {
    language,
    shipment,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
