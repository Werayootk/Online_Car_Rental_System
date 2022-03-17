import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import bookingSlice from './reducers/bookingSlice';
import orderSlice from './reducers/orderSlice';
import billSlice from './reducers/billSlice';

const store = configureStore({
    reducer: {
        booking: bookingSlice.reducer,
        order: orderSlice.reducer,
        bill: billSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }),
});

export default store;