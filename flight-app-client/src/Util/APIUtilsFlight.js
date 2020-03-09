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

export function postFlight(flight) {
    return request({
        url: API_BASE_URL + "/flight/add",
        method: 'POST',
        body: JSON.stringify(flight)
    })
}

export function getFlight(flightId) {
    return request({
        url: API_BASE_URL + "/flight/" + flightId,
        method: 'GET',
    })
}

export function getAllFlight() {
    return request({
        url: API_BASE_URL + "/flight/all",
        method: 'GET',
    })
}

export function updateFlight(flightId, uptadeFlight) {
    return request({
        url: API_BASE_URL + "/flight/" + flightId,
        method: 'PATCH',
        body: JSON.stringify(uptadeFlight)
    })
}

export function deleteFlight(id) {
    return request({
        url: API_BASE_URL + "/flight/" + id,
        method: 'DELETE'
    })
}