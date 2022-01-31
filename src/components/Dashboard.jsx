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


  const navigate = useNavigate()
//   const [quote, setQuote] = useState('')
//   const [tempQuote, setTempQuote] = useState("")

//   // this function can be used for rendering stuff i.e, set data into input fields etc
//   // REUSABLE for dataController as well i.e, for booking get requests etc
//   // since token is attached, after refreshing the data will remain 
//   const populatePage = async() =>{
//       // get requests
//       const request = await fetch(`${BACKEND_BASE_URL}/user/api/dashboard`, {
//         headers: {
//           "x-access-token": localStorage.getItem("token")
//         }
//       })

//       // this is for showing the quote
//       const data = await request.json()
//       if (data.status === "ok"){
//         setQuote(data.quote)
//         setEmail(data.email) 
//         setUserId(data._id)
//         setName(data.name)
//         setRole(data.role)
//         console.log("data", data)
//       } else{
//         alert(data.error)
//       }
      
//   }

//   // to check if token exists or not or login
//   useEffect(()=>{
//       const token = localStorage.getItem("token") // get from localstorage
//       if (!token){ // if token exists // if token doesnt exist, remove token from local storage and go back to login
//           localStorage.removeItem("token")
//           navigate("/login")
//         } else{
//           populatePage() // if token exists, do this
//         }
//       }
//   , [])

//   // to check if token exists or not
// //   useEffect(()=>{
// //     const token = localStorage.getItem("token") // get from localstorage
// //     if (token){ // if token exists
// //       const user = jwt.decode(token)
// //       console.log("fffff", user)
// //       if (!user){  // if token doesnt exist, remove token from local storage and go back to login
// //         localStorage.removeItem("token")
// //         navigate("/login")
// //       } else{
// //         populatePage() // if token exists, do this
// //       }
// //     }
// // }, [])

  // this is to update field and in this case is the Quote
  // async function updateQuote(event){
  //   event.preventDefault() // prevents whole page from refreshing
  //   const request = await fetch(`${BACKEND_BASE_URL}/user/api/dashboard`, {
  //     method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-access-token": localStorage.getItem("token")
  //       },
  //       body: JSON.stringify({
  //         quote: tempQuote,
  //       })
  //     })

  //     const data = await request.json()
  //     if (data.status === "ok"){
  //       setQuote(tempQuote)
  //       setTempQuote("")
  //     } else{
  //       alert(data.error)
  //     }
  //     console.log(data)
  // }


  const handleLogout = async(event) =>{
    setEmail("")
    setPassword("")
    setName("")

    event.preventDefault() // prevents whole page from refreshing

    try{
      await fetch(`${BACKEND_BASE_URL}/user/api/dashboard`, {
      method: "DELETE",
        headers: {
          "Content-Type": "application/json",
         
        }
      });
      localStorage.removeItem("session")
      navigate("/login")
    } catch(error){
      console.log(error)
    }
    

    
    
    
  }
  




  return (
    <>
    <h1>Dashboard</h1>
       {
         role === "Parent" ? 
         
            <Parent 
              // quote={quote}
              // setQuote={setQuote}
              // tempQuote={tempQuote}
              // setTempQuote={setTempQuote}
              // updateQuote={updateQuote}
              handleLogout={handleLogout}
            />     :

         <BabySitter 
              // quote={quote}
              // setQuote={setQuote}
              // tempQuote={tempQuote}
              // setTempQuote={setTempQuote}
              // updateQuote={updateQuote}
              handleLogout={handleLogout}
         />
         
       }
    </>
    )
};

export default Dashboard;
