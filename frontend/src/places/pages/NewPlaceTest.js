import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../utils/Button";
import ImageUpload from "../../utils/ImageUpload";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPlaceTest = ({ fillProgress }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(auth.userId);
  const [cred, setCred] = useState({
    title: "",
    desc: "",
    address: "",
    coordinates: {
      lat: 30.406616,
      long: -10.51515,
    },
  });
  const [error, setError] = useState("");

  const [pickedFile, setPickedFile] = useState();

  const addPicHandler = (id, picked) => {
    if (!picked) {
      toast.error("Must upload a place picture", {
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
    setPickedFile(picked);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    if (cred.title === "" || cred.address === "") {
      setError("This field can't be empty !!");
      return;
    }

    if (!error) {
      fillProgress(50);
      const data = {
        title: cred.title,
        desc: cred.desc,
        address: cred.address,
        uploader: auth.userId,
        placePic : pickedFile,
      };
      console.log(data);
      try {
        // const formData = new FormData() ;
        // formData.append('title',cred.title)
        // formData.append('desc',cred.desc)
        // formData.append('address',cred.address)
        // formData.append('uploader',auth.userId)
        // formData.append('coordinates',cred.coordinates)
        // formData.append('place-pic', pickedFile)

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });

        for (const [key, value] of formData) {
          console.log(key, " : ", value);
        }

        const response = await fetch("/api/place", {
          method: "POST",
          headers: {
            Authorization : 'Bearer '+auth.token
          },
          body: formData,
        });
        const resBody = response.json();
        if (!response.ok) throw new Error(resBody.message);
        fillProgress(100);
        navigate(`/place/user/${auth.userId}`);
      } catch (err) {
        fillProgress(100);
        console.log("kuchh to grbr h daya");
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
        return;
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCred((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
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
      <div className=" bg-slate-50 min-h-screen w-full bg-fixed">
        <div className=" text-center font-bold text-3xl text-gray-600 font-mono pt-5 uppercase ">
          add new place
        </div>
        <hr className="w-96 h-1 mx-auto  bg-gray-100 border-0 rounded  dark:bg-gray-500 mb-4"></hr>
        <div className=" bg-transparent w-11/12 h-full mx-auto flex align-center justify-center ">
          <div className="bg-white min-h-[580px] shadow-lg w-[500px] max-w-lg py-5 my-12  hover:scale-105 duration-300 ease-out">
            <div className="w-11/12 m-auto">
              <form action="">
                <h1 className=" mt-8 text-xl text-center sm:text-4xl capitalize font-bold font-mono text-gray-500 ">
                  Title
                </h1>
                <div className="mb-3 pt-0">
                  <input
                    name="title"
                    type="text"
                    placeholder="name of the place ..."
                    className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    onChange={handleChange}
                    value={cred.title}
                    required
                  />
                  {cred.title === "" && error && (
                    <h1 className="text-red-700 italic">{error}</h1>
                  )}
                </div>
                <h1 className=" mt-8 text-xl text-center sm:text-4xl capitalize font-bold font-mono text-gray-500 ">
                  description
                </h1>
                <div className="mb-3 pt-0">
                  <input
                    autoComplete="off"
                    name="desc"
                    type="textarea"
                    placeholder="write something about the place ..."
                    className="my-3 min-h-[100px] px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    onChange={handleChange}
                    value={cred.desc}
                  />
                </div>
                <h1 className=" mt-8 text-xl text-center sm:text-4xl capitalize font-bold font-mono text-gray-500 ">
                  Address
                </h1>
                <div className="mb-3 pt-0">
                  <input
                    autoComplete="off"
                    name="address"
                    type="textarea"
                    placeholder="Address of the place ..."
                    className="my-3  px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    onChange={handleChange}
                    value={cred.address}
                  />
                  {cred.address === "" && error && (
                    <h1 className="text-red-700 italic">{error}</h1>
                  )}
                </div>
                <ImageUpload
                  label={"Upload picture of the place here !! "}
                  onInput={addPicHandler}
                  id={"place-pic"}
                />
                <div className="flex justify-center">
                  <Button
                    colour={"blue"}
                    text={"Add Place"}
                    afterClick={handleClick}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPlaceTest;
