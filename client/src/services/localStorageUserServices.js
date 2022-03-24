import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const setToken = (token) => {
    localStorage.setItem('ACCESS_TOKEN', token)
}

const getToken = () => {
    return localStorage.getItem('ACCESS_TOKEN')
}

const removeToken = () => {
    localStorage.removeItem('ACCESS_TOKEN')
}

const getCookieToken = () => {
    return Cookies.get('Authorization');
}

const removeCookieToken = () => {
    Cookies.remove('Authorization');
}

const getRole = () => {
    const token = getToken();
    const token_cookies = getCookieToken();
    if (token) {
        const role = jwt_decode(token).role
        if (role === 'user') {
            return 'user'
        }
        if (role === 'admin') {
            return 'admin'
        }
    } else if (token_cookies) {
        const role = jwt_decode(token_cookies).role
        if (role === 'user') {
            return 'user'
        }
        if (role === 'admin') {
            return 'admin'
        }
    }
}

const getUserName = () => {
    const token = getToken()
    if (token) {
        const fname = jwt_decode(token).first_name 
        return fname
    }
}

const getUserInfo = () => {
    const token = getToken();
    const token_cookies = getCookieToken();
    const userInfo = {};
    if (token) {
        userInfo.first_name = jwt_decode(token).first_name;
        userInfo.last_name = jwt_decode(token).last_name;
        userInfo.email = jwt_decode(token).email;
        userInfo.phone_number = jwt_decode(token).phone_number;
        return userInfo;
    } else if(token_cookies) {
        userInfo.first_name = jwt_decode(token_cookies).first_name;
        userInfo.last_name = jwt_decode(token_cookies).last_name;
        userInfo.email = jwt_decode(token_cookies).email;
        userInfo.phone_number = jwt_decode(token_cookies).phone_number;
        return userInfo;
    }
}

const getUserID = () => {
    const token = getToken()
    if (token){
        const UserID = jwt_decode(token).id
        return Number(UserID)
    }
}

const localStorageServices = {
    setToken,
    getToken,
    removeToken,
    getRole,
    getUserName,
    getUserID,
    getUserInfo,
    getCookieToken,
    removeCookieToken
}

export default localStorageServices