import React, { useState,useContext } from 'react'
import signin from "../images/signin.svg"; // import the logo image
import { NavLink, json, useNavigate } from "react-router-dom";
import {userContext} from "../App";
const Login = () => {
 
  const {state,dispatch} = useContext(userContext)

  const navigate=useNavigate();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();  //bcz we are working on form sometime form reload again agian so we use this 

    const response = await fetch('http://localhost:27012/auth/signin', {
      method:"POST",
      headers: {
        "Content-Type": "application/json"  //same as post man's headers 
      },
      body: JSON.stringify({    //JSON MUST BE CAPITAL
          email,
        password
      })
    });

    let data = await response.json();

    if( response.status===400 || !data )
    {
      window.alert("Invalid Credentials ");

    console.log("Invalid Credentials from login side ");
    } else
    {
      if(data.token){
        // data = JSON.stringify(data);
        //use local storage of browser 
        localStorage.setItem("token",data.token );

        // console.log(data);

        window.alert("Login Successfuly")
        dispatch({type:"USER" ,  payload:true})  //go to action 
      navigate("/about")
      } 
      else{
        alert(data.error)
      }
    }
  }

  return (
    <>

      <section className='sign-in'>
        <div className="container mt-5">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={signin} alt="logiin pic" />
              </figure>
              <NavLink to="/signup" className="signup-image-link"> Create An Account</NavLink>
            </div>
            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <form method='POST' className='register-form' id="register-form">

                <div className="form-group">
                  <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                  <input type="text" name='name' id='name ' autoComplete='off'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                    placeholder='Your Name' />
                </div>


                <div className="form-group">
                  <label htmlFor="password"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                  <input type="password" name='password' id='password ' autoComplete='off'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                    placeholder='Your Password' />
                </div>


                <div className="form-group form-button ">
                  <input type="submit" name='signin' id='signin' className='form-submit'
                    onClick={loginUser}

                    value="Log In" />
                </div>
              </form>
            </div>


          </div>
        </div>
      </section>

    </>
  )
}

export default Login