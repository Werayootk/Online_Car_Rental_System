import { orderActions } from './orderSlice';
import adminService from '../../services/adminServices';

export const fetchOrderData = (currentPage, pageSize) => {
    return async (dispatch) => {
        let param = `?offset=${(currentPage - 1) * pageSize}`;
        await adminService.getOrderAll(param).then(res => {
            const orderItems = res.data;
            console.log(orderItems);

            dispatch(
                orderActions.replaceOrderState({
                    orderList: orderItems.data,
                })
            );
        }).catch(err => {
            console.error(err);
        });
    }
};