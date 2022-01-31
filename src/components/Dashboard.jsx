import React, {useEffect, useState} from "react"
// import jwt from "jsonwebtoken"
import { Link, Navigate, useNavigate } from "react-router-dom"
import {Form, Button, Card, Alert} from "react-bootstrap"
import { useContext } from "react"
import GeneralContext from "../context/GeneralContext"
import BabySitter from "./roles/BabySitter"
import Parent from "./roles/Parent"

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

const Dashboard = () => {

  
  const { userContext } = useContext(GeneralContext);
  const [
         name, setName,
         email, setEmail,
         password, setPassword,
         userId, setUserId,
         role, setRole] = userContext

  const user = JSON.parse(localStorage.getItem("currentUser")) // returns all the data from user
  



  const navigate = useNavigate()
  const [quote, setQuote] = useState('')
  const [tempQuote, setTempQuote] = useState("")

    // route GET cash data for index page only
    const loadPage = async () => {
      const res = await fetch(`${BACKEND_BASE_URL}/user/api/dashboard/${user._id}`);
      if (res.status !== 200) {
        console.error("failed to fetch item");
        
        return;
      }
      const data = await res.json();
      setQuote(data.quote)
      console.log("dddd", data)
    };

//   const populatePage = async() =>{
//     // get requests
//     const request = await fetch(`${BACKEND_BASE_URL}/user/api/dashboard/${user._id}`, {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     })

//     // this is for showing the quote
//     const data = await request.json()
//     if (data){
//       setQuote(data.quote)
  
//       console.log("data", data)
//     } else{
//       alert(data.error)
//     }
    
// }

useEffect(()=>{
  loadPage()
  }, [quote])
  


   // this is to update field and in this case is the Quote
   async function updateQuote(event){
    event.preventDefault() // prevents whole page from refreshing
    const res = await fetch(`${BACKEND_BASE_URL}/user/api/dashboard/${user._id}`, {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({
          quote: tempQuote,
        })
      })

      if (res.status !== 200) {
        console.error("failed to fetch item");
        
        return;
      }
      const data = await res.json();
      
      setQuote(tempQuote)
      setTempQuote("")

      console.log("gggg", data)
  }





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
    <h1>Dashboard</h1>
       {
         user.role === "parent" ? 
         
            <Parent 
              quote={quote}
              setQuote={setQuote}
              tempQuote={tempQuote}
              setTempQuote={setTempQuote}
              updateQuote={updateQuote}
              handleLogout={handleLogout}
            />     :

         <BabySitter 
              quote={quote}
              setQuote={setQuote}
              tempQuote={tempQuote}
              setTempQuote={setTempQuote}
              updateQuote={updateQuote}
              handleLogout={handleLogout}
         />
         
       }
    </>
    )
};

export default Dashboard;
