import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dataList: [],
    totalQuantity: 0
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        //add data (car location pickup/return date/time price total_price)
    }
});

export const bookingActions = bookingSlice.actions;

export default bookingSlice;