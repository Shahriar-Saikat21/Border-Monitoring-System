import {useForm} from 'react-hook-form';

import logo from "../assets/logo.png";

const Login = () => {

  const {register,handleSubmit,formState:{errors},reset} = useForm();


  return (
    <div className="flex border-2 rounded-md justify-center items-center md:mx-4 bg-[#F4F6FF]">
      <div className="hidden md:block p-10">
        <img src={logo} alt="Border Monitoring System" className='w-[300px]'/>
      </div>
      <div className=" px-10 py-6">
        <h1 className="text-3xl mb-2 pt-4 pr-5 font-bold font-primary text-[#4caf50]">
          Border Monitoring System
        </h1>
        <form className="flex flex-col justify-center items-start " onSubmit={handleSubmit()} noValidate>
          <label className=" my-2 font-primary">
            User ID
          </label>
          <input
            type="text"
            placeholder="Enter User ID"
            className="formInput"
            {...register("userId",{
              required: {
                value: true,
                message: "User ID is required",
              },
            })}
          />
          <p className=" mb-2 font-primary text-red-500">{errors.userId?.message}</p>
          <label className=" my-2 font-primary">
            Password
          </label>
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
          <p className=" mb-2 font-primary text-red-500">{errors.password?.message}</p>
          <button
            className="btn"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
