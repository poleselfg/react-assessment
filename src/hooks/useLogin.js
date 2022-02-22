import axios from 'axios';
import * as React from 'react';
import useLocalStorage from './useLocalStorage';

const useLogin = () => {
    const storage = useLocalStorage();
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const signIn = async (data) => {
        try {
            setLoading(true);
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/auth`, {
                username: data.username,
                password: data.password,
            });

            if (result.status >= 400) {
                throw new Error(result.data);
            }

            await getProfile(result.data.access_token)

            setToken(result.data.access_token);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    const getProfile = async (token) => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (result.status >= 400) {
                throw new Error('Failed getting profile');
            }

            setUser(result.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return {
        error,
        token,
        user,
        loading,
        signIn,
        getProfile
    }
}

export default useLogin;
