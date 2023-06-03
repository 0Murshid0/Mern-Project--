import React, { createContext, useReducer } from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Contact from "./component/Contact";
import Signup from "./component/Signup";
import Login from "./component/Login";
import About from "./component/About";
import Logout from "./component/Logout";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./component/ErrorPage";
import { initialState,reducer } from "../src/reducer/useReducer";
 // 1.context api
 export const userContext = createContext();
const App = () => {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
  
    <>
<userContext.Provider value={{state,dispatch}}>
<Navbar />
      <Routes>
      <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="Logout" element={<Logout />} />
        <Route     path="*"         element={<ErrorPage />}   />
      </Routes>
      </userContext.Provider>
    </>
  );
};

export default App;
