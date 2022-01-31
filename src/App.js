import React, {useEffect, useState} from "react"
import {Route, Routes } from 'react-router-dom'
import {Container} from "react-bootstrap"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import GeneralContext from "./context/GeneralContext"
import DefaultLayout from "./defaultLayout/DefaultLayout"
import UpdateProfile from "./components/UpdateProfile"

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL



function App() {
  

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [role, setRole] = useState("")


 
  return (
    
    <GeneralContext.Provider
        value={{
          userContext: [
            name, setName,
            email, setEmail,
            password, setPassword,
            passwordConfirm, setPasswordConfirm,
            role, setRole
          ]
        }}>
        <DefaultLayout>
        <Container className="d-flex align-items-center justify-content-center"
            style={{minHeight: "100vh"}}>
              <div className="w-100" style={{ maxWidth: "400px" }}>

              
            <Routes>
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/update-profile" element={<PrivateRoute> <UpdateProfile/> </PrivateRoute>} />
            </Routes>
            
          
       </div>
      </Container>
      </DefaultLayout>
    </GeneralContext.Provider>
    
  );
}

export default App;
