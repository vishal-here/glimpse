import React from "react";
import avatar from "../../resources/images/avatar.png";
import { Link } from "react-router-dom";
const UserList = (props) => {
  // console.log(props.list.length)
  if (!props.list) {
    return (
      <>
        <div className=" text-center text-4xl text-black font mono">
          No members currently !! Be a member and add your places ..
        </div>
      </>
    );
  }
  return (
    <>
      {props.list.map((x,id) => (
        <div key={id}>
          <Link to={`place/user/${x._id}`}>
            <div className=" bg-white min-h-20 p-5 flex hover:scale-105 hover:shadow-lg duration-300 ease-out">
              <div className="w-2/5">
                <img
                  className="w-12 h-12 my-auto rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src={`${process.env.REACT_APP_BACKEND_URL}/${x.image}`}
                  alt="Bordered avatar"
                />
              </div>
              <div>
                <h1 className="block text-3xl font-bold capitalize text-gray-600">
                  {x.name}
                </h1>
                <p className="block text-xl capitalize text-gray-600">
                  Places : {x.places.length}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default UserList;
