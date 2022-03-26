import axios from 'axios';
import localStorageServices from '../services/localStorageUserServices'

const { getToken, removeToken, getCookieToken, removeCookieToken } = localStorageServices;

axios.defaults.baseURL = "http://localhost:8000"
//axios.defaults.headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',}

axios.interceptors.request.use(
    (req) => {
        if (req.url.includes('/login') || req.url.includes('/register') || req.url.includes('/google')) {
           // req.headers['Access-Control-Allow-Origin'] = "*"
            return req;
        }
        const token = getToken();
        const token_cookies = getCookieToken();
        if (token) {
            //req.headers['Access-Control-Allow-Origin'] = "*"
            req.headers['Authorization'] = `Bearer ${token}`;           
        } else if (token_cookies) {
            //req.headers['Access-Control-Allow-Origin'] = "*"
            req.headers['Authorization'] = `Bearer ${token_cookies}`;           
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
            removeCookieToken();
            window.location.reload()
            return Promise.reject(err)
        }
        return Promise.reject(err)
    }
)

export default axios;