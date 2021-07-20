import {axios} from "../utils/request";
const api = {
    UserPre: '/api/User'
}

export function registerAPI(data) {
    console.log(data)
    return axios({
        url:  `${api.UserPre}/register`,
        method: 'POST',
        data
    })
}

export function LoginAPI() {

}

export function getInfoAPI(id) {
    return axios({
        url:   `${api.UserPre}/getUser/${id}`,
        method: 'GET',
    })
}

export function updateInfoAPI(data) {
    return axios({
        url:   `${api.UserPre}/updateUser`,
        method: 'POST',
        data
    })

}