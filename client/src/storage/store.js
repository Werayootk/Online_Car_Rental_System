import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import bookingSlice from './reducers/bookingSlice';
import orderSlice from './reducers/orderSlice';

const store = configureStore({
    reducer: {
        booking: bookingSlice.reducer,
        order: orderSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }),
});

export default store;