import React from "react";
import {useState,useEffect,useContext} from 'react';
import {Link, useParams , useNavigate} from 'react-router-dom';
import Button from "../../utils/Button";
import {AuthContext} from '../../context/AuthContext'

//  const places=[
//     {
//       id : "p1",
//       title : "nitsikkim" ,
//       description : " This college is present in the owe of Nature's beauty .." ,
//       imgUrl : 'https://i.ytimg.com/vi/roWr_swPSHU/maxresdefault.jpg' ,
//       address : "79X4+2W7, Barfung Block, Ravangla, Sikkim 737139" ,
//       location : {
//         lat : 40.48613,
//         long : 108.6664
//       },
//       creater : "u2"
//     },
//     {
//       id : "p2",
//       title : "nitsikkim" ,
//       desc : " This college is present in the owe of Nature's beauty .." ,
//       imgUrl : 'https://math.nitsikkim.ac.in/assets/images/campus1.jpg' ,
//       address : "79X4+2W7, Barfung Block, Ravangla, Sikkim 737139" ,
//       location : {
//         lat : 40.48613,
//         long : 108.6664
//       },
//       creater : "u1"
//     },
//     {
//       id : "p3",
//       title : "nitsikkim" ,
//       desc : " This college is present in the owe of Nature's beauty .." ,
//       imgUrl : 'https://images.news18.com/ibnlive/uploads/2021/10/sikkim-163523522416x9.jpg' ,
//       address : "79X4+2W7, Barfung Block, Ravangla, Sikkim 737139" ,
//       location : {
//         lat : 40.48613,
//         long : 108.6664
//       },
//       creater : "u2"
//     }
//   ] ;

  
  
  const UpdatePlace =  ({fillProgress}) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)
  const [wrong, setwrong] = useState("");
  const [cred, setCred] = useState({
    title: "",
    description: "",
    address : ""     
}) ;
const [error,setError] = useState("")
  
    const pid = useParams().pid ;

    useEffect(() => {
      
      const updatedPlace = async  () => { 
        try {
          fillProgress(30);
          const fetchResult = await fetch(`/api/place/${pid}`)
          fillProgress(70) ;
          const response = await fetchResult.json() ;
          if(!fetchResult.ok) throw new Error(response.message) ;
          console.log(response) ;
          setCred({
            title: response.title,
            description: response.description,
            address : response.address    
        })
          fillProgress(100)
        } catch (err) {
          console.log(err);
          setwrong(err.message) ;
          fillProgress(100) ;
        }
       }
       updatedPlace() ;

    }, [])
    

    // const x = places.find(x => x.id === pid) ;


   
    const handleClick = async (event)=>{
        if(cred.title === "" || cred.address ===""){
            setError("This field can't be empty !!") ;
        }
        setCred({
            title: "",
            description: "",
            address : ""     
        })
        fillProgress(50) ;
        try {
          await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/place/${pid}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization : 'Bearer '+auth.token
            },
            body: JSON.stringify(cred),
          });
          
        } catch (err) {
          // console.log(err.message)
          setwrong(err.message);
          fillProgress(100);
        }
        fillProgress(100) ;
        // console.log("submitted",cred)
        navigate(`/place/user/${auth.userId}`);
        event.preventDefault() ;
    }
    const handleChange =(e)=>{
        const { name, value } = e.target;
        setCred(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError("") ;
    }
    


  return (
    <>
      <div className=" bg-slate-50 min-h-screen w-full bg-fixed">
        <div className=" text-center font-bold text-3xl text-gray-600 font-mono pt-5 uppercase ">
          update place details
        </div>
        <hr className="w-96 h-1 mx-auto  bg-gray-100 border-0 rounded  dark:bg-gray-500 mb-4"></hr>
        <div className=" bg-transparent w-11/12 h-screen mx-auto flex align-center justify-center ">
          <div className="bg-white max-h-[580px] shadow-lg w-[500px] max-w-lg pt-5 mt-12  hover:scale-110 duration-300 ease-out">
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
                {
                    error && (
                        <h1 className="text-red-700 italic">
                            {error}
                        </h1>
                    )
                }
              </div>
              <h1 className=" mt-8 text-xl text-center sm:text-4xl capitalize font-bold font-mono text-gray-500 ">
                description
              </h1>
              <div className="mb-3 pt-0">
                <input
                  autoComplete="off"
                  name="description"
                  type="textarea"
                  placeholder="write something about the place ..."
                  className="my-3 min-h-[100px] px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                  onChange={handleChange}
                  value={cred.description}
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
               {
                    error && (
                        <h1 className="text-red-700 italic">
                            {error}
                        </h1>
                    )
                }
              </div>
                <div className="flex justify-around">
                <Link to='/'>
                <Button colour={"blue"} text={"cancel"}  />
                </Link>
                <Button colour={"orange"} text={"UPDATE"} afterClick={handleClick} />
                </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePlace;
