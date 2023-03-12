import React from 'react'
const Button = (props) => {
   const look = `inline-block px-6 py-2.5 bg-white text-blue-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 focus:text-white active:bg-blue-800 active:text-white  active:shadow-lg transition duration-150 ease-in-out` ;
    
  return (
    <button
    type="button"
    className={look}
    onClick={props.afterClick}
  >
    {props.text}
  </button>
  )
}

export default Button