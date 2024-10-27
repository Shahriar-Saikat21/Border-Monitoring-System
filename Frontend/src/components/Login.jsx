import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import logo from '../assets/logo.png'; 
import AuthContext from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [logError, setLogError] = useState('');
  const {loginUser} = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const useSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.data.success) {
        sessionStorage.setItem("access_token",response.data.access_token)
        sessionStorage.setItem("refresh_token",response.data.refresh_token)
        navigate('/home');
      } else {
        setLogError("Invalid User ID or Password !!!");
      }
    } catch (error) {
      setLogError("An error occurred. Please try again.");
    } finally {
      reset();
    }
  }

  return (
    <div className="flex border-2 rounded-md justify-center items-center md:mx-4 bg-[#F4F6FF]">
      <div className="hidden md:block p-10">
        <img src={logo} alt="Border Monitoring System" className='w-[300px]' />
      </div>
      <div className="px-10 py-6">
        <h1 className="text-3xl mb-2 pt-4 pr-5 font-bold font-primary text-[#4caf50]">
          Border Monitoring System
        </h1>
        {logError && <p className="mb-2 font-primary text-red-500">{logError}</p>}
        <form className="flex flex-col justify-center items-start" onSubmit={handleSubmit(useSubmit)} noValidate>
          <label className="my-2 font-primary">User ID</label>
          <input
            type="text"
            placeholder="Enter User ID"
            className="formInput"
            {...register("username", {
              required: {
                value: true,
                message: "User ID is required",
              },
            })}
          />
          <p className="mb-2 font-primary text-red-500">{errors.username?.message}</p>
          <label className="my-2 font-primary">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="formInput"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          <p className="mb-2 font-primary text-red-500">{errors.password?.message}</p>
          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
