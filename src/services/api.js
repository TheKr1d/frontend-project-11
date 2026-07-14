import axios from 'axios';

const PROXY_URL = 'https://allorigins.hexlet.app/get?disableCache=true';

export const fetchViaProxy = (url) => {
    return axios
        .get(PROXY_URL, {
            params: {
                url: url
            }
        })
};