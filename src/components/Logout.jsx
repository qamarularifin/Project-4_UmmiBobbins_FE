import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom"
import {Form, Button, Card, Alert} from "react-bootstrap"
import { useContext } from "react"
import GeneralContext from "../context/GeneralContext"

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

const Logout = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
  

    const { userContext } = useContext(GeneralContext);
    const [
            name, setName,
            email, setEmail,
            password, setPassword,
            role, setRole] = userContext

    const navigate = useNavigate()



  const handleLogout = async(event) =>{
    setEmail("")
    setPassword("")
    setName("")

    event.preventDefault() // prevents whole page from refreshing

    try{
      const response = await fetch(`${BACKEND_BASE_URL}/user/api/logout`, {
      method: "DELETE",
        headers: {
          "Content-Type": "application/json",
         
        }
      });
      const data = await response.json()
      if (data.status === "ok"){
        localStorage.removeItem("currentUser")
        navigate("/login")
      }
      
    } catch(error){
      console.log(error)
    }
    
    
  }


  return (
      <>
          <div className="w-100 text-center mt-2">
                    <Link to="/login"><Button variant="link" onClick={handleLogout}>Log Out</Button></Link>
                </div>
      </>
  )
};

export default Logout;

