import axios from "../config/axios";

export class adminService {
    API_ADMIN_PATH = '/admin'
    headers = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };

    getCustomerAll(params) {
        return axios.get(`${this.API_ADMIN_PATH}/customer${params}`);
    }

    getCustomerById(id) {
        return axios.get(`${this.API_ADMIN_PATH}/customer/${id}`);
    }

    updateCustomerById(id,params) {
        return axios.patch(`${this.API_ADMIN_PATH}/customer/${id}${params}`);
    }

    deleteCustomerById(id) {
        return axios.delete(`${this.API_ADMIN_PATH}/customer/${id}`);
    }

    addLocation(body) {
        return axios.post(`${this.API_ADMIN_PATH}/location`,body);

    }

    getLocationAll(params) {
        return axios.get(`${this.API_ADMIN_PATH}/location${params}`);
    }

    getLocationById(id) {
        return axios.get(`${this.API_ADMIN_PATH}/location/${id}`);

    }

    updateLocationById(id, params) {
        return axios.patch(`${this.API_ADMIN_PATH}/location/${id}${params}`);

    }

    deleteLocationById(id) {
        return axios.delete(`${this.API_ADMIN_PATH}/location/${id}`);

    }

    addCar(formData) {
        return axios.post(`${this.API_ADMIN_PATH}/car`,formData, this.headers);
    }

    getCarAll(params) {
        return axios.get(`${this.API_ADMIN_PATH}/car${params}`);

    }

    getCarById(id) {
        return axios.get(`${this.API_ADMIN_PATH}/car/${id}`);

    }

    updateCarById(id,params) {
        return axios.patch(`${this.API_ADMIN_PATH}/car/${id}${params}`);

    }

    deleteCarById(id) {
        return axios.delete(`${this.API_ADMIN_PATH}/car/${id}`);
    }

    getOrderAll(params) {
        return axios.get(`${this.API_ADMIN_PATH}/order${params}`);
    }

    getOrderById(id) {
        return axios.get(`${this.API_ADMIN_PATH}/order/${id}`);

    }

    updateOrderById(id,params) {
        return axios.patch(`${this.API_ADMIN_PATH}/order/${id}${params}`);

    }

    getBillAll(params) {
        return axios.get(`${this.API_ADMIN_PATH}/bill${params}`);

    }

    getBillById(id) {
        return axios.get(`${this.API_ADMIN_PATH}/bill/${id}`);

    }

    updateBillById(id,params) {
        return axios.patch(`${this.API_ADMIN_PATH}/bill/${id}${params}`);

    }
}

export default new adminService()