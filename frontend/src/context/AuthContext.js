import {createContext} from 'react';


export let AuthContext= createContext(
  {
    isLoggedIn : false ,
    token : null ,
    userId : null,
    login : ()=>{},
    logout : ()=>{},
  }
)