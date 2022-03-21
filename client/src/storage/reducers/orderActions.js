import { orderActions } from './orderSlice';
import adminService from '../../services/adminServices';

export const fetchOrderData = (currentPage, pageSize) => {
    return async (dispatch) => {
        let param = `?offset=${(currentPage - 1) * pageSize}`;
        await adminService.getOrderAll(param).then(res => {
            dispatch(
                orderActions.replaceOrderState({
                    orderList: res.data.data.orderList || [],
                })
            );
        }).catch(err => {
            console.error(err);
        });
    }
};