import axios from 'axios';

const requestApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL ?? "",

});

export default requestApi;