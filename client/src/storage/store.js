import { configureStore } from '@reduxjs/toolkit';

import bookingSlice from './reducers/bookingSlice';


const store = configureStore({
    reducer: {
        booking: bookingSlice.reducer,
    }
});

export default store;