import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response, // Directly return successful responses.
  async error => {
    const originalRequest = error.config;

    // Check for 401 status and prevent infinite loop
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried
      try {
        const refreshToken = sessionStorage.getItem('refresh_token'); // Retrieve the stored refresh token
        // Make a request to your auth server to refresh the token
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: refreshToken,
        });

        const accessToken = response.data.access;
        const refresh_Token = response.data.refresh;

        // Store the new tokens
        sessionStorage.setItem('access_token', accessToken);
        sessionStorage.setItem('refresh_token', refresh_Token);

        // Update the authorization header with the new access token
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        // Optional: Redirect to login or show an error message
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); 
  }
);

export default axiosInstance;
