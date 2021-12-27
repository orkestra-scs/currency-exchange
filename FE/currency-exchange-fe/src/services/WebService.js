import axios from "axios";

const baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true;

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

export const login =  (username, password) => {
    return axios.get(baseURL+"/login", {
        headers: {
            Authorization: 'Basic ' + window.btoa(username + ':' + password)
        }
    });
}

export const logout = () => {
    return axios.post(baseURL+"/logout");
}

export const register = (username,password) => {
    const user = {username,password}
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

export const getCurrencyLatest = (symbol) => {
    return axios.get(baseURL+"/currency/latest?symbol="+symbol);
}

export const getAllCurrencyLatest = () => {
    return axios.get(baseURL+"/currency/all-latest");
}

export const getCurrencyTimeSeries = (symbol, startDate, endDate) => {
    return axios.get(baseURL+"/currency/timeseries?symbol="+symbol+"&startDate="+startDate+"&endDate="+endDate);
}
