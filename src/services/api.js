import axios from 'axios';

const PROXY_URL = 'https://allorigins.hexlet.app/get';

export const fetchViaProxy = (url) => {
    return axios
        .get(PROXY_URL, {
            params: {
                url: url,
                disableCache: true
            },
            headers: {
                'Accept': 'application/json'
            }

        })
};