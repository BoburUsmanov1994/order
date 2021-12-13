import axios from "axios";
import config from "../../config";
import storage from "../local-storage";
import history from "../../router/history";
import {get} from "lodash";
import NProgress from "nprogress";

NProgress.configure({
    showSpinner: true,
    trickleRate: 0.02,
    trickleSpeed: 400,
    easing: "ease",
    speed: 200
});


const request = axios.create({
    baseURL: config.API_ROOT,
    params: {},
});

request.interceptors.request.use((config) => {
    NProgress.inc();
    const token = get(JSON.parse(storage.get('token')),'token',null);
    if (token) {
            config.headers['auth'] = `${token}`
    }
    return config;
}, (error) => {
    NProgress.done(true);
    console.log(error)
});

request.interceptors.response.use((response) => {
    NProgress.done(true);
    return response;
}, (error) => {
    const statusCode = error.response.status;
    if (statusCode == 401) {
        storage.remove('token');
        history.push('/auth');
    }

    NProgress.done(true);
    return Promise.reject(error);
});

export {request};