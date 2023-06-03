import React, { useState } from 'react'
import signup from "../images/signup.png"; // import the logo image
import { NavLink, useNavigate } from "react-router-dom";
const Signup = () => {
const navigate=useNavigate();
  const [user, setUser] = useState({   //get all fields the user enter in a sign up form
    name:"", email:"", phone:"", work:"", password:"", cpassword:""
  })
  
let name,value; //name means input field mai ek name tag hai jo os ki value hogi wo es ki ban jaye gi on change pr

  const handleAllInputs = (e) => {   // e  for event 
    console.log(e)
    
    name=e.target.name;    

    value=e.target.value; //wo value mile gai jo input field mei user enter kare ga 

     //using sepred oprator require all values of user 
    //  [name]: value is used to get dynamic data
     setUser({...user, [name]:value})   //name mei targeted name aye gi or value mei targeted value aye gi inputs fields se
  }
  

  const Datapost = async(e)=>{ 
      e.preventDefault();
      const {name , email,  phone,  work,  password,  cpassword} =user;

     const response =await fetch("http://localhost:27012/auth/register",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({  //the data sent to server is string so convert into the json format
        name , email,  phone,  work,  password,  cpassword
      })
     })
     const data=await response.json();

     if(data.status === 400 || !data)
     {
      window.alert("Invalid Registration");

      console.log("Invalid Registration");
     } 
     else
     {
      window.alert("Succesfully Registration");

      console.log("Succesfully Registration");
      
      navigate("/login"); //move to login page
     }
  }




  return (
    <>
      <section className='signup'>
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign Up</h2>
              <form className='register-form' method='POST' id="register-form">

                <div className="form-group">
                  <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                  <input type="text" name='name' id='name ' autoComplete='off' value={user.name}
                    onChange={handleAllInputs}
                    placeholder='Your Name' />
                </div>

                <div className="form-group">
                  <label htmlFor="email"><i className="zmdi zmdi-email material-icons-name"></i></label>
                  <input type="email" name='email' id='email ' autoComplete='off' value={user.email}
                    onChange={handleAllInputs}
                    placeholder='Your Email' />
                </div>

                <div className="form-group">
                  <label htmlFor="phone"><i className="zmdi zmdi-phone-in-talk material-icons-name"></i></label>
                  <input type="number" name='phone' id='phone ' autoComplete='off' value={user.phone}
                    onChange={handleAllInputs}
                    placeholder='Your Phone Number' />
                </div>

                <div className="form-group">
                  <label htmlFor="work"><i className="zmdi zmdi-slideshow material-icons-name"></i></label>
                  <input type="text" name='work' id='work ' autoComplete='off' value={user.work}
                    onChange={handleAllInputs}
                    placeholder='Your Profession' />
                </div>

                <div className="form-group">
                  <label htmlFor="password"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                  <input type="password" name='password' id='password ' autoComplete='off' value={user.password}  onChange={handleAllInputs} placeholder='Your Password' />
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                  <input type="password" name='cpassword' id='cpassword ' autoComplete='off' value={user.cpassword}
                    onChange={handleAllInputs}
                    placeholder='Confirm Password' />
                </div>
                <div className="form-group form-button ">
                  <input type="submit" name='signup' id='signup' className='form-submit' value="Register" 
                  
                   onClick={Datapost}
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={signup} alt="registration pic" />
              </figure>
              <NavLink to="/login" className="signup-image-link"> I am already register</NavLink>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Signup