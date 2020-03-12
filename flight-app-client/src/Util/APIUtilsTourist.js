import { API_BASE_URL } from '../Constants/index';

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

export function postTourist(addTouristRequest) {
    return request({
        url: API_BASE_URL + "/tourist/add",
        method: 'POST',
        body: JSON.stringify(addTouristRequest)
    })
}

export function getTourist(touristId) {
    return request({
        url: API_BASE_URL + "/tourist/" + touristId,
        method: 'GET',
    })
}

export function getAllTourist() {
    return request({
        url: API_BASE_URL + "/tourist/all",
        method: 'GET',
    })
}

export function updateTourist(touristId, uptadeTourist) {
    return request({
        url: API_BASE_URL + "/tourist/" + touristId,
        method: 'PATCH',
        body: JSON.stringify(uptadeTourist)
    })
}

export function deleteTourist(id) {
    return request({
        url: API_BASE_URL + "/tourist/" + id,
        method: 'DELETE'
    })
}

export function getCorrcetFlight(fligthSearchRequest) {
    return request({
        url: API_BASE_URL + "/tourist/search/" + fligthSearchRequest,
        method: 'GET'
    })
}

export function putRelationship(rlRq, touristid, flightid) {
    console.log(API_BASE_URL + "/tourist/"+ touristid + "/inflight/" + flightid);
    return request({
        url: API_BASE_URL + "/tourist/"+ touristid + "/inflight/" + flightid,
        method: 'PUT',
        body: JSON.stringify(rlRq)
    })
}

export function deleteRelationship(rlRq, touristid, flightid) {
    console.log(API_BASE_URL + "/tourist/"+ touristid + "/inflight/" + flightid);
    return request({
        url: API_BASE_URL + "/tourist/"+ touristid + "/inflight/" + flightid,
        method: 'DELETE',
        body: JSON.stringify(rlRq)
    })
}