import React , {useState,useContext} from "react";
import Button from "./Button";
import {AuthContext} from '../context/AuthContext'

export default function Modal(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [wrong, setwrong] = useState("");

  const auth = useContext(AuthContext) ;
  const handleDelete = async () => {
    try {
      setShowModal(false)
      await fetch(`http://localhost:4000/api/place/${props.placeId}`, {
        method: "DELETE",
        headers :{
          'Content-Type': 'application/json',
          Authorization : 'Bearer '+ auth.token
        }
      });
      props.onDelete(props.placeId); 
    } catch (err) {
      console.log(err.message)
      setwrong(err.message)
    }
  
};

  return (
    <>
    <Button colour={props.colour} text={props.text} afterClick={()=> setShowModal(true)} />
      {showModal ? (
          <>
          <div className="opacity-25 fixed min-h-screen inset-0 z-40 bg-black">
          </div>
          <div
            className="absolute overflow-x-hidden overflow-y-hidden inset-0 z-50 flex " >
            <div className=" min-w-[450px] w-3/5 my-auto mx-auto ">
              {/*content*/}
              <div className="border-0  shadow-lg relative flex flex-col w-3/4 mx-auto bg-white outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-center justify-center p-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-center text-3xl font-semibold font-mono">
                    {props.header}
                  </h3>
                </div>
                {/*body*/}
                  {props.children}
                {/*footer*/}
              {
                (props.footer === "viewonly") && (
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <Button colour={"blue"} text={"OK"} afterClick={()=> setShowModal(false)} />
                </div>
                )
              }
              {
                (props.footer === "confirm") && (

                  

                  <div className="flex items-center justify-around p-4 border-t border-solid border-slate-200 rounded-b">
                  <Button colour={"blue"} text={"CANCEL"} afterClick={()=>setShowModal(false)} />
                  <Button colour={"orange"} text={"CONFIRM"} afterClick={handleDelete} />
                </div>
                )
              }
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}