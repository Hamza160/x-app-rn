import axios, {AxioInstance} from "axios"
import {useAuth} from "@clerk/clerk-expo";

const API_BASE_URL = "https://x-app-rn.vercel.app/api";

export const createApiClient = (getToken: () => Promise<string | null>): AxioInstance => {
    const api = axios.create({
        baseURL: API_BASE_URL,
        header:{
            'Content-Type': 'application/json',
        }
    })

    api.interceptors.request.use(async (config) => {
        const token = await getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    })

    return api;
}

export const useApiClient = ():AxioInstance => {
    const {getToken} = useAuth()
    return createApiClient(getToken())
}

export const userApi = {
    syncUser: (api:AxioInstance) => api.post('/users/sync'),
    getCurrentUser: (api:AxioInstance) => api.get('/users/me'),
    updateProfile: (api:AxioInstance, data) => api.put('/users/profile', data),

}