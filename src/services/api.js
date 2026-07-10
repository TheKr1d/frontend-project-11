import axios from 'axios';

const PROXY_URL = 'https://allorigins.hexlet.app/get';

export const fetchViaProxy = (url) => {
    return axios
        .get(PROXY_URL, {
            params: {
                url: url,
                disableCache: true
            },
            timeout: 5000,
            headers: {
                'Accept': 'application/json'
            }

        })
};