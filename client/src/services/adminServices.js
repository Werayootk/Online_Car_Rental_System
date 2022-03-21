import axios from "../config/axios";

export class adminService {
    API_ADMIN_PATH = '/admin'
    headers_form = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };
    headers_JSON = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    getCustomerAll(params) {
        return axios.get(`${this.API_ADMIN_PATH}/customer${params}`);
    }

    getCustomerById(id) {
        return axios.get(`${this.API_ADMIN_PATH}/customer/${id}`);
    }

    updateCustomerById(id,body) {
        return axios.put(`${this.API_ADMIN_PATH}/customer/${id}`,body, this.headers_JSON);
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

    updateLocationById(id, body) {
        return axios.put(`${this.API_ADMIN_PATH}/location/${id}`, body, this.headers_JSON);
    }

    deleteLocationById(id) {
        return axios.delete(`${this.API_ADMIN_PATH}/location/${id}`);
    }

    addCar(formData) {
        return axios.post(`${this.API_ADMIN_PATH}/car`,formData, this.headers_form);
    }

    getCarAll(params) {
        return axios.get(`${this.API_ADMIN_PATH}/car${params}`);
    }

    getCarById(id) {
        return axios.get(`${this.API_ADMIN_PATH}/car/${id}`);
    }

    updateCarById(id,body) {
        return axios.put(`${this.API_ADMIN_PATH}/car/${id}`, body, this.headers_JSON);

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

    updateOrderById(id,body) {
        return axios.put(`${this.API_ADMIN_PATH}/order/${id}`, body, this.headers_JSON);

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