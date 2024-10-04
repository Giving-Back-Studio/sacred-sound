import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Helper function to check if the token is about to expire
const isTokenExpiringSoon = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    const tokenExpTime = decoded.exp; // Token expiration time in seconds

    // Check if the token expires in less than 5 minutes (300 seconds)
    return tokenExpTime - currentTime < 300;
    };

    // Function to refresh the access token if it's about to expire
    const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/refreshToken`);
        localStorage.setItem('sacredSound_accessToken', response.data.accessToken); // Update the access token
        return response.data.accessToken;
    } catch (err) {
        console.error('Error refreshing access token:', err);
        // No direct redirection here, just return null if refresh fails
        return null;
    }
    };

    // Setup Axios interceptor to automatically refresh the token if it's expiring
    const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
        async (config) => {
        let token = localStorage.getItem('sacredSound_accessToken');
        
        // Check if the token is about to expire
        if (token && isTokenExpiringSoon(token)) {
            token = await refreshAccessToken(); // Refresh token if needed
            if (token) {
            // If the token was refreshed, update the request headers
            config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        
        // Continue with the request
        return config;
        },
        (error) => {
        return Promise.reject(error);
        }
    );
    };

// Decode the access token from localStorage to get the user email
const getUserEmailFromToken = () => {
    const token = localStorage.getItem('sacredSound_accessToken');
    if (token) {
        try {
        const decoded = jwtDecode(token); // Decode the JWT token
        return { email: decoded.email, isValid: true }; // Extract email and set isValid to true
        } catch (error) {
        console.error('Error decoding token:', error);
        return { email: null, isValid: false }; // Return isValid false if decoding fails
        }
    }
    return { email: null, isValid: false }; // Return isValid false if no token
};

export { setupAxiosInterceptors, getUserEmailFromToken, refreshAccessToken };