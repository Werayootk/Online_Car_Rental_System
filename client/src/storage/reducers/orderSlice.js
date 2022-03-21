import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderList: [],
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        
    }
});

export const orderActions = orderSlice.actions;

export default orderSlice;