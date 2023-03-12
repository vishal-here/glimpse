import React from "react";
import Navlinks from './Navlinks';
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <>
     
     
      <div className=" p-4 min-h-10 bg-gradient-to-l from-sky-600 to-purple-600 grid grid-cols-3">
      
      <div className=" ml-10 md:ml-20 lg:ml-40 float-left text-white  font-mono text-4xl font-bold col-span-1 ">
      <Link to='/' > <span className="hover:scale-110 duration-150 ease-out">Glimpse</span> </Link>
        </div>
        <Navlinks />
      </div>
    </>
  );
};

export default Navbar;
