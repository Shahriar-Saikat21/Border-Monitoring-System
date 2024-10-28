import axiosInstance from "./axiosInstance";


export const login = async (data)=>{
    try{
        const response = await axiosInstance.post('api/login/', data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response;
    }catch(error){
        return false;
    }
}

export const logout = async () => {
    try {
        const refreshToken = sessionStorage.getItem('refresh_token');
        const response = await axiosInstance.post(
            'api/logout/', 
            {refresh_token: refreshToken},  
            { withCredentials: true }  // Set withCredentials in the config, not in the body
        );
        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return false;
    }
};