import axios from 'axios';

const requestApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL ?? "",
    headers: {
        'authorization': `Bearer ${process.env.EXPO_PUBLIC_TOKENS}`,
        'referer' : process.env.EXPO_PUBLIC_API_URL,
    }
});

export default requestApi;