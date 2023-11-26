import axios from 'axios'
import { getTokenFromStorage } from '../helper/localstorage.helper'

export const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
})

instance.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers = {
        ...config.headers,
        "Authorization": `Bearer ` + getTokenFromStorage() || '',
    }
    return config
})