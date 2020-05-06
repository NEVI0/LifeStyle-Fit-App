import { AsyncStorage } from 'react-native';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://life-style-fit-api.herokuapp.com'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('@LIFESTYLE:user');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (err) => {
        return new Promise.reject(err);
    }
);

export default instance;