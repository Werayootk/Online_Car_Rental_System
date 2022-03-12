import axios from 'axios';
import localStorageServices from '../services/localStorageUserServices'

const { getToken, removeToken } = localStorageServices;

axios.defaults.baseURL = "http://localhost:8000"

axios.interceptors.request.use(
    (req) => {
        if (req.url.includes('/login') || req.url.includes('/register')) {
            return req;
        }
        const token = getToken();
        if (token) {
            req.headers['Authorization'] = `Bearer ${token}`;           
        }
        return req;
    }, (err) => {
        Promise.reject(err);
    }
)

axios.interceptors.response.use(
    (res) => {
        return res
    }, (err) => {
        if (err.response?.status === 401) {
            removeToken();
            window.location.reload()
            return Promise.reject(err)
        }
        return Promise.reject(err)
    }
)

export default axios;