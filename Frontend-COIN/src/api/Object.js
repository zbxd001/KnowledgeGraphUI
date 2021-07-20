import { axios } from "../utils/request";
const api = {
    objectPre: '/api/Object'
}

export function addObjectAPI(data) {
    return axios({
        url: `${api.objectPre}/addNode`,
        method: 'POST',
        data
    })
}

export function delObjectAPI(id) {
    return axios({
        url: `${api.objectPre}/delNode/${id}`,
        method: 'POST',
    })
}

export function updateObjectAPI(data) {
    return axios({
        url: `${api.objectPre}/updateNode`,
        method: `POST`,
        data
    })
}

export function searchObjectAPI(data) {
    return axios({
        url: `${api.objectPre}/searchNode/${data.id}`,
        method: `POST`
    })
}

export function getAllObjectAPI() {
    return axios({
        url: `${api.objectPre}/getAllObject`,
        method: `GET`
    })
}