import axios from "../config/axios";

export class paymentService {
    API_PAYMENT_PATH = '/payment';

    updateBillStatusByUser(booking_no, params) {
        return axios.patch(`${this.API_PAYMENT_PATH}/bill-status/${booking_no}${params}`);
    }
}

export default new paymentService()