import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import api from '../services/lifestyle.api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {

    const [ user, setUser ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const loadStorageData = async () => {
			try {
				const storagedUser = await AsyncStorage.getItem('@LIFESTYLE:user');
            	if (storagedUser) setUser(JSON.parse(storagedUser.user));
			} catch (err) {
				console.log("Error: ", err);
			}
        }

        loadStorageData();
    }, []);
    
    const signIn = async ({ email, password }) => {
        try {

            setIsLoading(true);
            const resp = await api.post('/auth/signin', { email, password });
            setUser(resp.data.user);
            setIsLoading(false);
            setError(null);
            await AsyncStorage.setItem('@LIFESTYLE:user', JSON.stringify(resp.data));
            await AsyncStorage.setItem('@LIFESTYLE:token', resp.data.token);

        } catch ({ response }) {
            setIsLoading(false);
            setError(response.data.message);
        }
    }

    const signUp = async ({ name, email, password, confirmPass }) => {
        try {

            setIsLoading(true);
            const resp = await api.post('/auth/signup', { name, email, password, confirmPass });
            setUser(resp.data.user);
            setIsLoading(false);
            setError(null);
            await AsyncStorage.setItem('@LIFESTYLE:user', JSON.stringify(resp.data));
            await AsyncStorage.setItem('@LIFESTYLE:token', resp.data.token);

        } catch ({ response }) {
            setIsLoading(false);
            setError(response.data.message);
        }
    }

    const signOut = async () => {
        setUser(null);
        await AsyncStorage.clear();
    }

    const clearErrors = () => {
        setIsLoading(false);
        setError(null);
	}
	
    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            isLoading,
            error,
            signIn,
            signUp,
            signOut,
			clearErrors,
        }}>
            { children }
        </AuthContext.Provider>
    );

}

export default AuthContext;