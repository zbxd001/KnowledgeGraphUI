import {axios} from "../utils/request";
const api = {
    objectPre: '/api/Relation'
}

export function addRelationAPI(data) {
    return axios({
        url:  `${api.objectPre}/addRelation`,
        method: 'POST',
        data
    })
}

export function delRelationAPI(id) {
    return axios({
        url:  `${api.objectPre}/delRelation/${id}`,
        method: 'POST',
    })
}

export function updateRelationAPI(data) {
    return axios({
        url:   `${api.objectPre}/updateRelation`,
        method: `POST`,
        data
    })
}

export function searchRelationAPI(id) {
    return axios({
        url:  `${api.objectPre}/searchRelation/${id}`,
        method: `POST`
    })
}

export function getAllRelationAPI(){
    return axios({
        url: `${api.objectPre}/getAllRelation`,
        method: `GET`
    })
}