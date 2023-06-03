import React, { useEffect,useContext } from 'react'
import {useNavigate} from "react-router-dom";
import {userContext} from "../App";
const Logout = () => {
    const {state,dispatch} = useContext(userContext)
    const navigate = useNavigate();
    // using promies 
    const token =  localStorage.removeItem("token");
    useEffect(() => {
        fetch('http://localhost:27012/auth/Logout',
            {
                method: "GET",
                headers: {
                     Authorization : token,
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            }
        )
        .then((res)=>{
            dispatch({type:"USER" ,  payload:false}) 
            navigate("/Login",{replace:true});
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
              
              }
        }).catch ((err)=>{console.log(err);})
    }, [])
    return (
        <h1>Logout page</h1>
    )
}

export default Logout