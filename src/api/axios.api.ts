import axios from 'axios'
import { getTokenFromStorage } from '../helper/localstorage.helper'

export const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers:{
        Authorization: `Bearer ` + getTokenFromStorage() || '',
        
    },
})