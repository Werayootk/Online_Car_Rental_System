import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookingList: [],
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        addToBookingList(state, action) {
            const newBooking = action.payload;
            state.bookingList.push({
                carId: newBooking.carId,
                locationId: newBooking.locationId,
                car: newBooking.car,
                location: newBooking.location,
                pickup_date: newBooking.pickup_date,
                return_date: newBooking.return_date,
                diff_days: newBooking.diff_days,
                car_price: newBooking.car_price,
                total_price: newBooking.total_price
            });
        },
        updateCarToBookingList(state, action) {
            const { index, carId, car, car_price, total_price } = action.payload;
            const existingBooking = state.bookingList[index];
            existingBooking.carId = carId;
            existingBooking.car = car;
            existingBooking.car_price = car_price;
            existingBooking.total_price = total_price;
        },
        clearBookingState(state, action) {
            state.bookingList = [];
        },
        //updateTimeToBookingList
    }
});

export const bookingActions = bookingSlice.actions;

export default bookingSlice;