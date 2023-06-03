import React, { useEffect, useState } from 'react';
import samplepic from "../images/samplepic.jpg";
import {useNavigate} from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [userdata , setUserdata] =useState({})
  const callAboutPage= async()=> {
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
      // console.log(data);

      setUserdata(data)

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
    callAboutPage();
  }, []);


  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img src={samplepic} alt="samplepic" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userdata.name}</h5>
                <h6>{userdata.work}</h6>
                <p className='profile-rating mt-3 mb-5'> Rating: <span>1/10</span></p>

                <ul className="nav nav-tabs" role='tablist'>
                  <li className="nav-item">
                    <a className='nav-link' id='home-tab' data-toggle="tab" href="#home" role='tab' aria-controls='home' aria-selected="true">About</a>
                  </li>
                  <li className="nav-item" >
                    <a className='nav-link' id='profile-tab' data-toggle="tab" href="#profile" role='tab' aria-controls='profile' aria-selected="false">Timeline</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <input type="submit" className='profile-edit-btn' name='btnAddMore' value="Edit Profile" />
            </div>

          </div>
          <div className="row">
            {/* left side urls */}
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINKS</p>
                <a href="https://www.youtube.com/channel/UC8_dxzAVtj6mWWWkLxnA3RQ" target='_israr'>Youtube</a> <br />
                <a href="https://www.youtube.com/channel/UC8_dxzAVtj6mWWWkLxnA3RQ" target='_israr'>Instagram</a> <br />
                <a href="https://www.youtube.com/channel/UC8_dxzAVtj6mWWWkLxnA3RQ" target='_israr'>Facebook</a> <br />
                <a href="https://www.youtube.com/channel/UC8_dxzAVtj6mWWWkLxnA3RQ" target='_israr'>Git Hub</a> <br />
                

              </div>
            </div>
             {/* right side toggle */}
             <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id='tabcontent' >
                <div className="tab-pane fade show active" id='home' role='tabpanel' aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <p>User ID</p>
                    </div>
                    <div className="col-md-6">
                     <p>{userdata.id}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>Name</p>
                    </div>
                    <div className="col-md-6">
                     <p>{userdata.name}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>E-mail</p>
                    </div>
                    <div className="col-md-6">
                     <p>{userdata.email}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>Phone</p>
                    </div>
                    <div className="col-md-6">
                     <p>{userdata.phone}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>Profession</p>
                    </div>
                    <div className="col-md-6">
                     <p>{userdata.work}</p>
                    </div>
                  </div>             
                </div>
                <div className="tab-pane fade show active" id='profile' role='tabpanel' aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <p>Experience</p>
                    </div>
                    <div className="col-md-6">
                     <p>Extra Jonior</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>Name</p>
                    </div>
                    <div className="col-md-6">
                     <p>{userdata.name}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>E-mail</p>
                    </div>
                    <div className="col-md-6">
                     <p>{userdata.email}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>Phone</p>
                    </div>
                    <div className="col-md-6">
                     <p>{userdata.phone}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>Profession</p>
                    </div>
                    <div className="col-md-6">
                     <p>{userdata.work}</p>
                    </div>
                  </div>             
                </div>
              </div>
             </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default About