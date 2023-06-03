import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
const Contact = () => {
  const navigate = useNavigate();
  const [userdata , setUserdata] =useState({name:"",email:"",phone:"",message:""})
  const userContact= async()=> {
    try {
      const token = await localStorage.getItem("token");
      // console.log(token)
      const res = await fetch('http://localhost:27012/auth/getdata',{
        
        method:"GET",
        headers:{
          Authorization : token,
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);

      setUserdata({...userdata,name:data.name,email:data.email,phone:data.phone})
//yahan tk all clear ha ===============

  // yahan issue arha hai res.status se
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }

  useEffect(() => {
    userContact();
  }, []);

//now storing data in states
const handleInput = (e) =>{
  const name = e.target.name;
  const value = e.target.value;
  //using spread operator to modified the state
setUserdata({...userdata, [name]:value})  
}
 
//send data to backend

 const handleContactMessage = async(e)=>{
  e.preventDefault();
  const {name,email,phone,message}=userdata;
  const token = await localStorage.getItem("token");
  const res = await fetch("http://localhost:27012/auth/contact",{
    method:"POST",
    headers:{
      Authorization : token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
             name,email,phone,message
    })
  })
  const data = await res.json();
  if(!data){console.log("message not send")}
  else{
    alert("Message send");
    setUserdata({...userdata,message:""}) //this means when message is sent the message box will empty auto
  }
 }

  return (
   <>
   <div className="contact_info">
    <div className="container-fulid">
      <div className="row">
        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
          {/* FOR PHONE NUMBER */}
        <div className="contact_info_item d-flex jsutify-content-start align-items-center">
               <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
               <div className="contact_info_content">
                <div className="contact_info_title">
                  Phone
                </div>
                <div className="contact_info_text">
                  +92 303 0177991
                </div>
               </div>
        </div>
        
        {/* FOR email NUMBER */}
        <div className="contact_info_item d-flex justify-content-start align-items-center">
               <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
               <div className="contact_info_content">
                <div className="contact_info_title">
                  Email
                </div>
                <div className="contact_info_text">
                  israrshauib20@gmail.con
                </div>
               </div>
        </div>
        {/* FOR address NUMBER */}
        <div className="contact_info_item d-flex justify-content-start align-items-center">
               <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
               <div className="contact_info_content">
                <div className="contact_info_title">
                  Address
                </div>
                <div className="contact_info_text">
                  Kahan Nau,Lahore
                </div>
               </div>
        </div>
        </div>
      </div>
    </div>
   </div>
   {/* Contact us form */}
   <div className="contact_form">
    <div className="container">
      <div className="row">
      <div className="col-lg-10 offset-lg-1">
        <div className="contact_form_container py-5">
          <div className="contact_form_title">
            Get in Touch
            <form method='POST' id='contact_form'>
              <div className="contact_form_name d-flex  justify-content-between align-items-between mt-3">
                <input type="text" id='contact_form_name'
                  className='contact_form_name input_field'
                  name='name'
                  value={userdata.name}
                  onChange={handleInput}
                  placeholder='Your Name' required={true }
                />
                <input type="email" id='contact_form_email'
                  className='contact_form_email input_field'
                  name='email'
                  value={userdata.email}
                  onChange={handleInput}
                  placeholder='Your Email' required={true } 
                />
                <input type="number" id='contact_form_phone'
                  className='contact_form_phone input_field'
                  name='phone'
                  value={userdata.phone}
                  onChange={handleInput}
                  placeholder='Your Phone' required={true }
                />
                </div>
                <div className="contact_form_text mt-5">
                  <textarea className="text_field_ contact_form_message"
                  name='message'
                  onChange={handleInput}
                  placeholder='Message' cols="60" rows="5"></textarea>
                </div>
                <div className="contact_form_button">
<button type='submit' className='button contact_submit_button' onClick={handleContactMessage}> Send Message</button>
                </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
   </div>
   </>
  )
}

export default Contact