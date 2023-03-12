import React, { useEffect, useState , Suspense} from "react";
// import PlaceList from "../compnents/PlaceList";
import { useParams } from "react-router-dom";
import Loading from '../../utils/Loading'
import { ToastContainer, toast } from "react-toastify";

const PlaceList = React.lazy(()=> import('../compnents/PlaceList'))


const Place = ({ fillProgress , checkProgress }) => {
  const [loadedPlace, setLoadedPlace] = useState([]);

  // const places=[
  //   {
  //     id : "p1",
  //     title : "nitsikkim" ,
  //     desc : " This college is present in the owe of Nature's beauty .." ,
  //     imgUrl : 'https://i.ytimg.com/vi/roWr_swPSHU/maxresdefault.jpg' ,
  //     address : "79X4+2W7, Barfung Block, Ravangla, Sikkim 737139" ,
  //     location : {
  //       lat : 40.48613,
  //       long : 108.6664
  //     },
  //     creater : "u2"
  //   },
  //   {
  //     id : "p2",
  //     title : "nitsikkim" ,
  //     desc : " This college is present in the owe of Nature's beauty .." ,
  //     imgUrl : 'https://math.nitsikkim.ac.in/assets/images/campus1.jpg' ,
  //     address : "79X4+2W7, Barfung Block, Ravangla, Sikkim 737139" ,
  //     location : {
  //       lat : 40.48613,
  //       long : 108.6664
  //     },
  //     creater : "u1"
  //   },
  //   {
  //     id : "p3",
  //     title : "nitsikkim" ,
  //     desc : " This college is present in the owe of Nature's beauty .." ,
  //     imgUrl : 'https://images.news18.com/ibnlive/uploads/2021/10/sikkim-163523522416x9.jpg' ,
  //     address : "79X4+2W7, Barfung Block, Ravangla, Sikkim 737139" ,
  //     location : {
  //       lat : 40.48613,
  //       long : 108.6664
  //     },
  //     creater : "u2"
  //   }
  // ] ;

  const uuid = useParams().uid;
  useEffect(() => {
    const getList = async () => {


      try {
        fillProgress(30);
        const fetchResult = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/place/user/${uuid}`
        );
        fillProgress(70);
        const response = await fetchResult.json();
        fillProgress(100);
        // console.log(response.places)
        if (!fetchResult.ok) {
          // console.log(response.message);
          throw new Error(response.message);
        }
        setLoadedPlace(response.places);
      } catch (err) {
        console.log(err);
        fillProgress(100);
      }
    };
    getList();
  }, []);

  const handleDelete = (deleted_place_id) => { 
    setLoadedPlace(prev => prev.filter( place => place._id!== deleted_place_id))
   }

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
      <div className="  bg-slate-50 h-full">
        <div className=" text-center font-bold text-4xl md:text-6xl text-gray-600 font-mono pt-5 uppercase ">
          places
        </div>
        <hr className="w-1/2 h-1 mx-auto  bg-gray-100 border-0 rounded  dark:bg-gray-500 mb-4"></hr>
        <div className="w-11/12 m-auto">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 ">
            {!checkProgress && loadedPlace && (
              <Suspense fallback={ <Loading size={100} />}>
                <PlaceList list={loadedPlace} onPlaceDelete={handleDelete}  />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Place;
