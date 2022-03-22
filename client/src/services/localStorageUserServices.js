import jwt_decode from 'jwt-decode'

const setToken = (token) => {
    localStorage.setItem('ACCESS_TOKEN', token)
}

const getToken = () => {
    return localStorage.getItem('ACCESS_TOKEN')
}

const removeToken = () => {
    localStorage.removeItem('ACCESS_TOKEN')
}

const getRole = () => {
    const token = getToken();
    if (token) {
        const role = jwt_decode(token).role
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
    const token = getToken()
    const userInfo = {};
    if (token) {
        userInfo.first_name = jwt_decode(token).first_name;
        userInfo.last_name = jwt_decode(token).last_name;
        userInfo.email = jwt_decode(token).email;
        userInfo.phone_number = jwt_decode(token).phone_number;
        return userInfo;
    } else {
        
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
    getUserInfo
}

export default localStorageServices
