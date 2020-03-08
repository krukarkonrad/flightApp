import { API_BASE_URL } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function postTurist(addTurist) {
    return request({
        url: API_BASE_URL + "/turist/add",
        method: 'POST',
        body: JSON.stringify(addTuristRequest)
    })
}

export function getTurist(turistId) {
    return request({
        url: API_BASE_URL + "/turist/" + turistId,
        method: 'GET',
    })
}

export function getAllTurist() {
    return request({
        url: API_BASE_URL + "/turist/all",
        method: 'GET',
    })
}

export function updateTurist(turistId, uptadeTurist) {
    return request({
        url: API_BASE_URL + "/turist/" + turistId,
        method: 'PATCH',
        body: JSON.stringify(uptadeTurist)
    })
}

export function deleteTurist(id) {
    return request({
        url: API_BASE_URL + "/turist/" + id,
        method: 'DELETE'
    })
}