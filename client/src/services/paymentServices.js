import axios from "../config/axios";

export class paymentService {
    API_PAYMENT_PATH = '/payment';
    headers = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    updateBillStatusByUser(booking_no, params) {
        return axios.patch(`${this.API_PAYMENT_PATH}/bill-status/${booking_no}${params}`);
    }

    omiseCheckoutCreditCard(body) {
        return axios.post(`${this.API_PAYMENT_PATH}/checkout-creditCard`, body, this.headers);
    }

    omiseCheckoutInternetBanking(body) {
        return axios.post(`${this.API_PAYMENT_PATH}/checkout-internetBanking`, body, this.headers);
    }
}

export default new paymentService()