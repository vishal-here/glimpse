import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../utils/Button";
import Modal from "../../utils/Modal";
import {AuthContext} from '../../context/AuthContext';
const PlaceList = (props) => {
  const auth = useContext(AuthContext) ;

  if (props.list.length ===0) {
    return (
      <>
        <div className="relative my-5  text-4xl font-bold text-purple-600 font-mono">
          No Places to show ..
        </div>
        <div className="my-auto">
         {
          !auth.isLoggedIn &&  <Link to="/auth">
          <Button colour={"blue"} text={"Share some places"} />
        </Link>
         }

        </div>
      </>
    );
  }
  return (
    <>
      {props.list.map((x) => {
        return (
          <div className="flex justify-center " key={x._id}>
            <div className="rounded-lg shadow bg-white w-full  m-10 hover:shadow-lg duration-300 ease-out ">
              <img className="rounded-t-lg w-full max-h-[600px]" src={`${process.env.REACT_APP_BACKEND_URL}/${x.image}`} alt={x.title} />

              <div className="p-6 flex flex-col content-center">
                <h5 className="text-gray-900 text-xl font-medium mb-2 uppercase text-center">
                  {x.title}
                </h5>
                <p className="text-gray-700 text-base mb-4 text-center capitalize">
                  {x.address}
                </p>
                <p className="text-gray text-base mb-4 text-center capitalize">
                  {x.description}
                </p>
                <div className="flex flex-col sm:flex-row justify-between p-2">
          
              
                  <Modal
                    colour={"blue"}
                    text={"VIEW ON MAP"}
                    header={"Map"}
                    footer={"viewonly"}
                  >
                    <div className="relative p-6 flex-auto">
                      <img
                        className="w-full"
                        src="https://i.stack.imgur.com/sakPM.png"
                        alt="map"
                      />
                    </div>
                  </Modal>
              
                { auth.isLoggedIn && auth.userId === x.creater &&   <Modal
                    colour={"red"}
                    text={"DELETE"}
                    header={"DELETE"}
                    footer={"confirm"}
                    placeId = {x._id}
                    onDelete = {props.onPlaceDelete}
                  >
                    <h1 className="text-2xl text-center my-5 ">
                      Are you sure want to delete this place ?
                    </h1>
                  </Modal>}
                  <Link to={`/place/${x._id}`}>
                  {
                  auth.isLoggedIn && auth.userId === x.creater &&  <Button colour={"orange"} text={"UPDATE"} />}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PlaceList;
