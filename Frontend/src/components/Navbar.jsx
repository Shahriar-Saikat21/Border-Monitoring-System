import logo from '../assets/logo.png';
import {useState} from 'react'
import { NavLink} from "react-router-dom";
import { HiOutlineBars4,HiOutlineXMark } from "react-icons/hi2";

const Navbar = () => {
  const[toggle,setToggle]=useState(false);
  const toggleHandler=()=>{setToggle(!toggle)};

  return (
    <nav className="bg-[#4caf50] fixed w-full h-[60px] z-50">
      <div className=" md:max-w-[1800px] max-w-[600px] m-auto w-full h-full flex justify-between items-center md:px-12 px-4">
        <div className='flex justify-between items-center'>
            <img src={logo} className='h-[50px]'/>
            <h1 className="md:text-3xl text-xl font-bold text-[#ffffff] ml-2 font-primary">Border Monitoring System</h1>
        </div>
        
        <ul className="hidden md:flex justify-center items-center gap-4 ">
          <NavLink to={"/home"}className=" pcNav">Dashboard</NavLink>
          <NavLink to={"/history"}className=" pcNav">History</NavLink>
          <NavLink to={"/"}className=" pcNav">Logout</NavLink>
        </ul>
        <div className='md:hidden' onClick={toggleHandler}>
          {
            toggle?<HiOutlineXMark className=' text-3xl text-[#ffffff] cursor-pointer'/>:
              <HiOutlineBars4 className=' text-3xl text-[#ffffff] cursor-pointer'/>
          }            
        </div>

        <div className={toggle?'absolute bg-[#4caf50] w-full md:hidden border-b top-[60px] left-0':'hidden'}>
          <ul className=" p-5 flex flex-col gap-2">
            <NavLink to={"/home"} className=" mobileNav">Dashboard</NavLink>
            <NavLink to={"/history"} className=" mobileNav">History</NavLink>
            <NavLink to={"/"} className=" mobileNav">Logout</NavLink>      
          </ul>
        </div>       
      </div>
    </nav>
  );
};

export default Navbar;

