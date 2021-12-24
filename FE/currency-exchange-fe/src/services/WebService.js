import axios from "axios";

const baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true;

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

export const login =  (email, password) => {
    return axios.get(baseURL+"/login", {
        headers: {
            Authorization: 'Basic ' + window.btoa(email + ':' + password)
        }
    });
}

export const logout = () => {
    return axios.post(baseURL+"/logout");
}

export const register = (name,email,password) => {
    const user = {name,email,password}
    return axios.post(baseURL+"/register", user);
}

export const addCurrency = (currency) => {
    return axios.post(baseURL+"/currency", currency);
}

export const getCurrencies = () => {
    return axios.get(baseURL+"/currency");
}

export const updateCurrency = (currency) => {
    return axios.put(baseURL+"/currency", currency);
}

export const deleteCurrency = (symbol) => {
    return axios.delete(baseURL+"/currency?symbol="+symbol);
}

export const getCurrenyLatest = (symbol) => {
    return axios.get(baseURL+"/currency/latest?symbol="+symbol);
}

export const getCurrenyTimeSeries = (symbol, startDate, endDate) => {
    return axios.get(baseURL+"/currency/timeseries?symbol="+symbol+"&startDate="+startDate+"&endDate="+endDate);
}