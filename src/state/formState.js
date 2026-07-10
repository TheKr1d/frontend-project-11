import { proxy } from 'valtio/vanilla';


export const formState = proxy({
    state: 'waiting', // 'failed', 'uploaded', 'loaded'
    error: null,
    urls: []
})

export const setFormState = (newState, data) => {
    switch (newState) {
        case 'failed': {
            const { errorMessage } = data
            Object.assign(formState, {
                state: newState,
                error: errorMessage
            });
            break;
        }
        case 'loaded': {
            Object.assign(formState, {
                state: newState
            });
            break;
        }
        case 'uploaded': {
            const { url } = data

            Object.assign(formState, {
                state: newState,
                error: null,
                urls: [...formState.urls, url]
            });
            break;
        }

        default:
            return
    }
}

export const getUrls = () => formState.urls.length === 0 ? [] : formState.urls.map(url => url.url);