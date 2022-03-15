import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderList: [],
    totalQuantity: 0
}

const billSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
        
    }
});

export const billActions = billSlice.actions;

export default billSlice;