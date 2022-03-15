import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookingList: [],
    totalQuantity: 0
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        addToBookingList(state, action) {
            const newBooking = action.payload;
            state.totalQuantity++;
            state.bookingList.push({
                carId: newBooking.carId,
                locationId: newBooking.locationId,
                car: newBooking.car,
                location: newBooking.location,
                pickup_date: newBooking.pickup_date,
                return_date: newBooking.return_date,
                car_price: newBooking.car_price,
                total_price: newBooking.total_price
            });
        },
        // change data update car and price
        updateBookingList(state, action) {

        }
    }
});

export const bookingActions = bookingSlice.actions;

export default bookingSlice;