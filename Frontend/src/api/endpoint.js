import axiosInstance from "./axiosInstance";


export const login = async (data)=>{
    try{
        const response = await axiosInstance.post('api/login/', data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    }catch(error){
        return false;
    }
}

export const logout = async ()=>{
    try{
        const response = await axiosInstance.post('api/logout/');
        return response.data;
    }catch(error){
        return false;
    }
}