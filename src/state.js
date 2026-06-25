import { proxy } from 'valtio/vanilla';

export const stateUI = proxy({
  urls: [],
  errors: []
});

export const addUrl = (url) => {
    stateUI.urls = [...stateUI.urls, url];
    stateUI.errors = [];
};

export const setErrors = (errors) => {
    stateUI.errors = [...errors];
};