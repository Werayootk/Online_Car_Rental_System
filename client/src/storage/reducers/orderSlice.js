import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderList: [],
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addToOrderList(state, action) {
            const orderItem = action.payload;
            state.orderList.push({
                return_location: orderItem.return_location,
                pickup_location: orderItem.pickup_location,
                start_datetime: orderItem.start_datetime,
                end_datetime: orderItem.end_datetime,
                booking_no: orderItem.booking_no,
                refund: orderItem.refund,
                booking_status: orderItem.booking_status,
                id: orderItem.id,
            });
        },
        updateToOrderList(state, action) {
            const {
                return_location,
                pickup_location,
                start_datetime,
                end_datetime,
                booking_no,
                refund,
                booking_status,
                id,
            } = action.payload;
            const existingOrder = state.orderList[id];
            existingOrder.return_location = return_location;
            existingOrder.pickup_location = pickup_location;
            existingOrder.start_datetime = start_datetime;
            existingOrder.end_datetime = end_datetime;
            existingOrder.booking_no = booking_no;
            existingOrder.refund = refund;
            existingOrder.booking_status = booking_status;
        },
        clearOrderState(state, action) {
            state.orderList = [];
        },
        replaceOrderState(state, action) {
          state.orderList = action.payload;
        }
    }
});

export const orderActions = orderSlice.actions;

export default orderSlice;