// import React, {useState} from "react"
// import { useContext } from "react"
// import GeneralContext from "../context/GeneralContext"
// const { userContext } = useContext(GeneralContext);
// const [
//        name, setName,
//        email, setEmail,
//        password, setPassword,
//        userId, setUserId,
//        role, setRole] = userContext

// const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
// export default populatePage = await fetch(`${BACKEND_BASE_URL}/user/api/dashboard`, {
//     headers: {
//       "x-access-token": localStorage.getItem("token")
//     }
//   }
//   )

//   // this is for showing the quote
//   const data = await request.json()
//   if (data.status === "ok"){
//     //setQuote(data.quote)
//     setEmail(data.email) 
//     setUserId(data._id)
//     setName(data.name)
//     setRole(data.role)
//     console.log("data", data)
//   } else{
//     alert(data.error)
//   }