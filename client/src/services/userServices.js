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

    editUserProfile(body) {
        return axios.put(`${this.API_USER_PATH}/edit-profile`, body);
    }

    editUserPassword(body) {
        return axios.put(`${this.API_USER_PATH}/edit-password`, body);
    }

    login_google_success() {
        return axios.get(`${this.API_USER_PATH}/google/`); 
    }
}

export default new userService()