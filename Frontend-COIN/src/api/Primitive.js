import {axios} from "../utils/request";
const api = {
    objectPre: '/api/primitive'
}

export function addPrimitiveAPI(data) {
    console.log(data)
    return axios({
        url:  `${api.objectPre}/add_primitive`,
        method: 'POST',
        data
    })
}

export function delPrimitiveAPI(id) {
    return axios({
        url:  `${api.objectPre}/delPrimitive/${id}`,
        method: 'POST',
    })
}

export function updatePrimitiveAPI(data) {
    console.log(data)
    return axios({
        url:   `${api.objectPre}/updatePrimitive`,
        method: `POST`,
        data
    })
}

export function searchPrimitiveAPI(data) {
    return axios({
        url:  `${api.objectPre}/searchPrimitive/${data.id}`,
        method: `POST`
    })

}

export function getAllPrimitiveAPI(){
    return axios({
        url: `${api.objectPre}/getAllPrimitive`,
        method: `GET`
    })
}