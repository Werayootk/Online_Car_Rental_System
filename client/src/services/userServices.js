import axios from "../config/axios";

export class userService {
    API_USER_PATH = '/user';

    register(body) {
        return axios.post(`${this.API_USER_PATH}/register`,body);
    }

    login(body) {
        return axios.post(`${this.API_USER_PATH}/login`,body);
    }
    
    forgotPassword(body) {
        return axios.post(`${this.API_USER_PATH}/forgot-password`,body);
    }

    resetPassword() {
        return axios.get(`${this.API_USER_PATH}/reset-password`);
    }

    updatePassword(body) {
        return axios.put(`${this.API_USER_PATH}/update-password`, body);
    }
}

export default new userService()