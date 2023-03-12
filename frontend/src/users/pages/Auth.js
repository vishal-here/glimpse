import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom' 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ImageUpload from '../../utils/ImageUpload';
const Auth = (props) => {
  const navigate = useNavigate() ;
  const auth = useContext(AuthContext);
  const [suCred, setSuCred] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const [loginError, setLoginError] = useState("");
  
  const [pickedFile, setPickedFile] = useState();
  
  //sighnup handler
  const handleImage = (id , picked) => { 
    
    if(!picked){
      toast.error("Must upload a profile picture"  , {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return ;
    }
    setPickedFile(picked) ;
   }
  const handleSignUpSubmit = async (event) => {

    if (
      suCred.username === "" ||
      suCred.email === "" ||
      suCred.password === "" ||
      suCred.confirmPassword === ""
    ) {
      setError("This field can't be empty !!");
      setError2("");
      return;
    }
    if (
      (suCred.password !== "" || suCred.confirmPassword !== "") &&
      suCred.password !== suCred.confirmPassword
    ) {
      setError2("Password dont match !!");
      return;
    }
    setSuCred({
      username: suCred.username,
      email: suCred.email,
      password: suCred.password,
      confirmPassword: suCred.confirmPassword,
    });
    if (!error && !error2) {
      const data = {
        name: suCred.username,
        email: suCred.email,
        password: suCred.password,
      };
      try {
        const formData = new FormData() ;
        formData.append('name',suCred.username)
        formData.append('email',suCred.email)
        formData.append('password',suCred.password)
        formData.append('profile-pic', pickedFile)
        props.fillProgress(10);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/signup`, {
          method: "POST",
          body : formData
        });
        props.fillProgress(50);
        
        for (const [key, value] of formData) {
          console.log(key , " : " , value)
        }

        const resBody = await response.json();
        // console.log(resBody);
        props.fillProgress(100);
        if (!response.ok) throw new Error(resBody.message);
        auth.login(resBody.user._id , resBody.token);
        toast.success("Registered Successfully !!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/') ;
      } catch (err) {
        props.fillProgress(100);
        toast.error(err.message.toString(), {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // setServerError("") ;
        return;
      }
    }
    setSuCred({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    
    event.preventDefault();
  };

  //login handler
  
  const handleLoginSubmit = async (event) => {
    if (cred.email === "" || cred.password === "") {
      setLoginError("This field can't be empty !!");
      return;
    }
    setCred({
      email: cred.email,
      password: cred.password,
    });

    const data = {
      email: cred.email,
      password: cred.password,
    };
    if (!loginError) {
      try {
        props.fillProgress(50);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const resBody = await response.json() ;
        // console.log(resBody)

        props.fillProgress(100);
        setLoginError("") ;
        
        if (!response.ok) throw new Error(resBody.message);
        console.log(resBody.user._id)
        auth.login(resBody.user._id, resBody.token);
        toast.success(resBody.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/') ;
      } catch (err) {
        console.log(err);
        props.fillProgress(100);
        toast.error(err.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    }
    setCred({
      email: "",
      password: "",
    });

    event.preventDefault();
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSuCred((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
    setError2("");
  };
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setCred((e) => ({
      ...e,
      [name]: value,
    }));
    setLoginError("");
  };

  const loginside = useRef(null);
  const handleRef = () => {
    signupside.current.style.display = "none";
    loginside.current.style.display = "block";
  };
  const signupside = useRef(null);
  const handleSignupRef = () => {
    loginside.current.style.display = "none";
    signupside.current.style.display = "block";
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <section className="min-h-full bg-cover   gradient-form bg-gray-200 ">
        <div className="container py-12 px-6 mx-auto h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="w-full">
              <div className="block bg-gray-200 rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div
                    ref={signupside}
                    className="hidden min-w-[360px] w-6/12 mx-auto flex items-center lg:rounded-lg rounded-lg bg-white border-x-2 border-blue-800"
                  >
                    <div className="w-10/12 mx-auto">
                      <div className="text-center">
                        <img
                          className="mx-auto w-48"
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          alt="logo"
                        />
                        <h4 className=" font-mono text-4xl font-bold mt-1 mb-12 pb-1 uppercase text-center text-gray-500">
                          sign up
                        </h4>
                      </div>
                      <form>
                        <div className="mb-4">
                          <input
                            name="username"
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Username"
                            onChange={handleSignUpChange}
                            value={suCred.username}
                          />
                          {error && suCred.username === "" && (
                            <h1 className="text-red-700 italic">{error}</h1>
                            )}
                        </div>

                        <div className="mb-4">
                          <input
                            name="email"
                            type="email"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Email"
                            value={suCred.email}
                            onChange={handleSignUpChange}
                          />
                          {error && suCred.email === "" && (
                            <h1 className="text-red-700 italic">{error}</h1>
                          )}
                        </div>
                        <div className="mb-4">
                          <input
                            name="password"
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Password"
                            value={suCred.password}
                            onChange={handleSignUpChange}
                          />
                          {error && suCred.password === "" && (
                            <h1 className="text-red-700 italic">{error}</h1>
                            )}
                          {error2 && (
                            <h1 className="text-red-700 italic">{error2}</h1>
                            )}
                        </div>
                        <div className="mb-4">
                          <input
                            name="confirmPassword"
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Confirm Password"
                            value={suCred.confirmPassword}
                            onChange={handleSignUpChange}
                          />
                          {error && suCred.confirmPassword === "" && (
                            <h1 className="text-red-700 italic">{error}</h1>
                            )}

                          {error2 && (
                            <h1 className="text-red-700 italic">{error2}</h1>
                            )}
                        </div>
                         {!auth.isLoggedIn &&  <ImageUpload id={"profile-pic"} onInput={handleImage} />} 
                        <div className="text-center pt-1 mb-12 pb-1">
                          <button
                            className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3
                      bg-gradient-to-l from-sky-600 to-purple-600
                       hover:scale-105 
                      "
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={handleSignUpSubmit}
                          >
                            Sign up
                          </button>
                        </div>
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Already have an account?</p>
                          <button
                            type="button"
                            className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-800 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-600 hover:text-white  focus:outline-none focus:ring-0 transition duration-300 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={handleRef}
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    ref={loginside}
                    className="min-w-[360px] w-6/12 mx-auto flex items-center lg:rounded-lg rounded-lg bg-white border-x-2 border-blue-800"
                  >
                    <div className="w-10/12 mx-auto">
                      <div>
                        <div className="text-center">
                          <img
                            className="mx-auto w-48"
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                            alt="logo"
                          />
                          <h4 className=" font-mono text-4xl font-bold mt-1 mb-12 pb-1 uppercase text-center text-gray-500">
                            login
                          </h4>
                        </div>
                        <form>
                          <div className="mb-4">
                            <input
                              name="email"
                              type="text"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              placeholder="Email"
                              onChange={handleLoginChange}
                            />
                            {loginError && cred.email === "" && (
                              <h1 className="text-red-700 italic">
                                {loginError}
                              </h1>
                            )}
                          </div>
                          <div className="mb-4">
                            <input
                              name="password"
                              type="password"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              placeholder="Password"
                              onChange={handleLoginChange}
                            />
                          </div>
                          {loginError && cred.password === "" && (
                            <h1 className="text-red-700 italic">
                              {loginError}
                            </h1>
                          )}
                          <div className="text-center pt-1 mb-12 pb-1">
                            <button
                              className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3
                      bg-gradient-to-l from-sky-600 to-purple-600
                       hover:scale-105 
                      "
                              type="button"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                              onClick={handleLoginSubmit}
                            >
                              Log in
                            </button>
                            <a className="text-gray-500" href="#!">
                              Forgot password?
                            </a>
                          </div>
                          <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2">Don't have an account?</p>
                            <button
                              type="button"
                              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-800 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-600 hover:text-white  focus:outline-none focus:ring-0 transition duration-300 ease-in-out"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                              onClick={handleSignupRef}
                            >
                              Sign Up
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
