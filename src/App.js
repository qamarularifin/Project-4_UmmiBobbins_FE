import React, {useEffect, useState} from "react"
import {Route, Routes } from 'react-router-dom'
import {Container} from "react-bootstrap"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import GeneralContext from "./context/GeneralContext"
import DefaultLayout from "./defaultLayout/DefaultLayout"

function App() {
  const token = localStorage.getItem("token")
  const [userId, setUserId] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")


  return (
    
    <GeneralContext.Provider
        value={{
          userContext: [
            name, setName,
            email, setEmail,
            password, setPassword,
            passwordConfirm, setPasswordConfirm,
            userId, setUserId
          ]
        }}>
        <DefaultLayout>
        <Container className="d-flex align-items-center justify-content-center"
            style={{minHeight: "100vh"}}>
              <div className="w-100" style={{ maxWidth: "400px" }}>

              
            <Routes>
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/dashboard/" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
      
            </Routes>
            
          
       </div>
      </Container>
      </DefaultLayout>
    </GeneralContext.Provider>
    
  );
}

export default App;
