import React from 'react'
import { NavLink } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <>
   <div id="notfound">
    <div className="notfound">
        <div className="notfound-404">
            <h1>  404  </h1>
        </div>
        <h2>Page Not Found</h2>
        <p className="mb-5">
        Address sahi enter kr na
        </p>
        <NavLink to="/"> 
             Back to Home
        </NavLink>
    </div>
   </div>

    </>
  )
}

export default ErrorPage