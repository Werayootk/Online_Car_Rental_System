import axios from "../config/axios";

export class myBookingService {
    API_BOOKING_PATH = '/booking';

    getBookingList(params) {
        return axios.get(`${this.API_BOOKING_PATH}/booking-list${params}`);
    }

    getBookingByStatus(booking_no) {
        return axios.get(`${this.API_BOOKING_PATH}/booking-status/${booking_no}`);
    }

    cancelBookingById(booking_no) {
        return axios.patch(`${this.API_BOOKING_PATH}/cancel-booking/${booking_no}`);
    }
}

export default new myBookingService()