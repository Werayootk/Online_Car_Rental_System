import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderList: [],
    totalQuantity: 0
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        
    }
});

export const orderActions = orderSlice.actions;

export default orderSlice;