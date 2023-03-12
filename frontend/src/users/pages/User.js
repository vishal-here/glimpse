import React, { useEffect, useState } from "react";
import UserList from "../components/UserList";
import pic from "../../resources/images/index_page_img.jpg";

import { ToastContainer, toast } from "react-toastify";

const User = ({ fillProgress, checkProgress }) => {

  

  const [loadedUser, setLoadedUser] = useState([]);
  const [error, setError] = useState("");

  


  useEffect(() => {



    const loadPage = async () => {
      try {
        fillProgress(10);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/`);
        fillProgress(50);
        const resBody = await response.json();
        setLoadedUser(resBody.user);
        fillProgress(100);
        // toast("Welcome", {
        //   position: "top-center",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
        if (!response.ok) {
          throw new Error("Could net get list of users !! ");
        }
      } catch (err) {
        fillProgress(100);
        setError(err.message);
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
      }
    };
    loadPage();
  }, [fillProgress]);
  // const users = [
  //   {
  //     id: "u1",
  //     name: "vishal",
  //     places: 3,
  //     avatar: "../../resources/images/avatar.png",
  //   },
  //   {
  //     id: "u2",
  //     name: "Ujjwal",
  //     places: 3,
  //     avatar: "x",
  //   },
  //   {
  //     id: "u3",
  //     name: "manish",
  //     places: 0,
  //     avatar: "../../resources/images/avatar.png",
  //   },
  //   {
  //     id: "u4",
  //     name: "Ashish",
  //     places: 2,
  //     avatar: "../../resources/images/avatar.png",
  //   },
  //   {
  //     id: "u5",
  //     name: "Ishan",
  //     places: 5,
  //     avatar: "../../resources/images/avatar.png",
  //   },
  // ];

  //async function should not be used directly inside useEffect

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
      <div>
        <img
          src={pic}
          alt="index-img"
          className="h-[60vh] md:h-[70vh] w-full"
        />
      </div>
      <div className=" bg-slate-50 h-full">
        <div className=" text-center font-bold text-4xl md:text-6xl text-gray-600 font-mono pt-5 uppercase ">
          travellers
        </div>
        <hr className="w-1/2 h-1 mx-auto  bg-gray-100 border-0 rounded  dark:bg-gray-500 mb-4"></hr>

        <div className=" grid gap-4 p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!checkProgress && loadedUser && <UserList list={loadedUser} />}
        </div>
      </div>
    </>
  );
};

export default User;
