import React , {useRef,useState , useEffect} from "react";
import Button from '../utils/Button'
const ImageUpload = (props) => {
    const [file, setFile] = useState() ;
    const [previewUrl, setPreviewUrl] = useState() ;
    const filePicker = useRef() ;

  //preview generator :
  useEffect(() => {
    if(!file) return ;
    const fileReader = new FileReader() ;
    fileReader.onload = () => { 
      setPreviewUrl(fileReader.result)
     } ;
     fileReader.readAsDataURL(file) ;
  

  }, [file])
  

    const pick = () => { 
      filePicker.current.click() ;  
     }
    const pickHandler = (e) => { 
      let pickedFile  ;
      if(e.target.files && e.target.files.length ===1){
        pickedFile = e.target.files[0] ;
        setFile(pickedFile) ;
        console.log(e.target.files[0])
      }
      props.onInput(props.id , pickedFile)
     }
  return (
    <>
     <div className="flex justify-center">
  <div className="mb-3 w-full flex-col justify-center">
    <label htmlFor={props.id} className="form-label inline-block mb-2 text-gray-500 text-lg italic font-mono text-center w-full"> {props.label}</label>
    <input
    onChange={pickHandler}
    ref={filePicker}
    className="form-control
    hidden
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" 
    id={props.id} 
    accept = ".jpg,.jpeg,.png"

    />

    <div className="mt-2 container w-1/2 m-auto  border-dashed border-gray-300  border-2">
      {previewUrl && <img src={previewUrl} alt="picked-img" /> }  
      {!previewUrl && <p className="w-full text-center my-auto">Please pick an image</p> }  
    </div>
   <div className="mt-2 flex justify-center">
   <Button text ={"Upload Image"} colour={"blue"} afterClick ={pick}/>
   </div>
  </div>
        
</div>
    </>
  );
};

export default ImageUpload;
