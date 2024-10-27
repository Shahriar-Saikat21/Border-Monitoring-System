import {useState,useEffect} from 'react'
import AuthContext from './AuthContext'
import {login,logout} from '../api/endpoint'


const AuthContextProvider = ({children})=>{
    const[auth,setAuth] = useState(false)

    const loginUser = async(data)=>{
        const response = await login(data);
        if(response.data.success){
            setAuth(true);
        }
        return response
    }

    const logoutUser = async ()=>{
        const response = await logout();
        if(response.data.success){
            setAuth(false);
        }
        return response
    }

    return(
        <AuthContext.Provider value={{auth,loginUser,logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider