import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import burger from "../resources/images/hamburger.png.png";
import { AuthContext } from "../context/AuthContext";

const Navlinks = () => {
  const [show, setShow] = useState("");
  const auth = useContext(AuthContext);
  return (
    <>
      <div className="col-span-2 hidden md:block">
        {!auth.isLoggedIn && (
          <Link to="/auth">
            <button className=" text-white font-mono text-2xl  ml-10 float-right hover:scale-105 duration-150 ease-out">
              Authenticate
            </button>
          </Link>
        )}
        {!auth.isLoggedIn && (
          <Link to="/">
            <button className=" text-white font-mono text-2xl  ml-10 float-right hover:scale-105 duration-150 ease-out">
              People
            </button>
          </Link>
        )}
        {auth.isLoggedIn && (
          <Link to={`/place/user/${auth.userId}`}>
            <button className=" text-white font-mono text-2xl  ml-10 float-right hover:scale-105 duration-150 ease-out">
              My Places
            </button>
          </Link>
        )}
        {auth.isLoggedIn && (
          <Link to="/place/new">
            <button className=" text-white font-mono text-2xl ml-10 float-right hover:scale-105  duration-150 ease-out">
              New Places
            </button>
          </Link>
        )}
        {auth.isLoggedIn && (
          <Link to="/">
            <button
              onClick={auth.logout}
              className=" text-white font-mono text-2xl float-right ml-10 hover:scale-105  duration-150 ease-out"
            >
              Logout
            </button>
          </Link>
        )}
      </div>
      <div className=" col-span-2 flex justify-end md:hidden">
        <img
          className=" "
          src={burger}
          alt="burger"
          onClick={() => setShow("active")}
        />
      </div>
      {show === "active" && (
        <>
          <div className="bg-black min-h-screen fixed inset-0 opacity-25 z-40"></div>
          <div className="z-50 min-h-[80px] absolute rounded shadow-lg bg-white p-4  right-4 top-16 text-sky-600">
            <h1
              onClick={() => setShow("")}
              className="font-bold flex justify-center text-3xl text-gray-500 hover:text-black hover:text-4xl hover:animate-spin"
            >
              X
            </h1>
            <div className="flex flex-col p-5 justify-center">
              {!auth.isLoggedIn && (
                <Link to="/auth" className="hover:bg-gray-100">
                  <button
                    onClick={() => setShow("")}
                    className=" text-sky-600 font-mono text-2xl  ml-10  hover:scale-105 duration-150 ease-out "
                  >
                    Authenticate
                  </button>
                </Link>
              )}
              {auth.isLoggedIn && (
                <Link to="/place/new">
                  <button
                    onClick={() => setShow("")}
                    className=" text-sky-600 font-mono text-2xl ml-10 hover:scale-105  duration-150 ease-out"
                  >
                    New Places
                  </button>
                </Link>
              )}
              {auth.isLoggedIn && (
                <Link to={`/place/user/${auth.userId}`}>
                  <button
                    onClick={() => setShow("")}
                    className=" text-sky-600 font-mono text-2xl ml-10 hover:scale-105  duration-150 ease-out"
                  >
                    My Places
                  </button>
                </Link>
              )}
              {!auth.isLoggedIn && (
                <Link to="/">
                  <button
                    onClick={() => setShow("")}
                    className=" text-sky-600 font-mono text-2xl ml-10 hover:scale-105  duration-150 ease-out"
                  >
                    People
                  </button>
                </Link>
              )}
              {auth.isLoggedIn && (
                <Link to="/">
                  <button
                    onClick={() => {
                      auth.logout();
                      setShow("");
                    }}
                    className=" text-sky-600 font-mono text-2xl ml-10 hover:scale-105  duration-150 ease-out"
                  >
                    Logout
                  </button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navlinks;
