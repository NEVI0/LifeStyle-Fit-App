import { AsyncStorage } from 'react-native';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://life-style-fit-api.herokuapp.com'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('@LIFESTYLE:token');
        
        if (token) {
            config.headers.Authorization = `${token}`;
        }

        return config;
    },
    (err) => {
        return new Promise.reject(err);
    }
);

export default instance;