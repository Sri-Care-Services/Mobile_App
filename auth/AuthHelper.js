import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

// Function to login and store token
export const login = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store the JWT token in AsyncStorage
            await AsyncStorage.setItem('token', data.token);
            return { success: true, token: data.token };
        } else {
            return { success: false || 'Login failed' };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred. Please try again later.' };
    }
};

// Function to get the JWT token from AsyncStorage
export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Failed to get token from AsyncStorage', error);
        return null;
    }
};

// Function to make requests with the token in the header
export const makeAuthenticatedRequest = async (path, method = 'GET', body = null) => {
    const token = await getToken();

    if (!token) {
        return { success: false, message: 'No token found. Please login again.' };
    }

    try {
        const response = await fetch(`${BASE_URL}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add token to the header
            },
            body: body ? JSON.stringify(body) : null,
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data: data };
        } else {
            return { success: false, data: data || 'Request failed' };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred. Please try again later.' };
    }
};

// Function to logout and remove token from AsyncStorage
export const logout = async () => {
    try {
        await AsyncStorage.removeItem('token');
        return { success: true };
    } catch (error) {
        console.error('Failed to remove token from AsyncStorage', error);
        return { success: false, message: 'Logout failed' };
    }
};
