import React from 'react'
import  { useEffect, useState } from 'react';

const Home = () => {
  const [userName , setUserName] =useState("")
  const [show,setShow]=useState(false)
  const userHomePage= async()=> {
    try {
      const token = await localStorage.getItem("token");
      // console.log(token)
      const res = await fetch("http://localhost:27012/auth/getdata",{
        
        method:"GET",
        headers:{
          Authorization : token,
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });

      const data = await res.json();

      setUserName(data.name)
      setShow(true)

      
    } catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {
    
    userHomePage();
  }, []);
  return (
    <>
    <div className="home-page">
      <div className="home-div">
        <p className="mt-5">
          WELCOME
        </p>
        <h1>
        {userName}
        </h1>
        <h2>
         {show?'Happy to see you back' : 'This is my Mern Stack project'}
        </h2>
      </div>
    </div>
    </>
  )
}

export default Home
