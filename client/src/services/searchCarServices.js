import axios from "../config/axios";

export class searchCarService {
    API_CAR_PATH = '/search-car';

    getCarListAll(params) {
        return axios.get(`${this.API_CAR_PATH}/car-list${params}`);
    }

    getProvinceAndLocation() {
        return axios.get(`${this.API_CAR_PATH}/location`);
    }

    getCarDetailById(id) {
        return axios.get(`${this.API_CAR_PATH}/car-detail/${id}`);
    }

    createCarOrder(body) {
        return axios.post(`${this.API_CAR_PATH}/create-booking`,body);
    }
    
}

export default new searchCarService()