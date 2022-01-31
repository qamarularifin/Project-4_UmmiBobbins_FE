import React, {useRef, useState, useEffect} from "react"
import {Form, Button, Card, Alert} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import GeneralContext from "../context/GeneralContext"

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

const UpdateProfile = () => {

    const { userContext } = useContext(GeneralContext);
    const [
            name, setName,
            email, setEmail,
            password, setPassword,
            passwordConfirm, setPasswordConfirm,
            userId, setUserId,
            role, setRole] = userContext

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    console.log("tttt", userId)

    /////////////
    const populatePage = async() =>{
        // get requests
        const request = await fetch(`${BACKEND_BASE_URL}/user/api/dashboard`, {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }
        )
  
        // this is for showing the quote
        const data = await request.json()
        if (data.status === "ok"){
          //setQuote(data.quote)
          setEmail(data.email) 
          setUserId(data._id)
          setName(data.name)
          setRole(data.role)
          console.log("data", data)
        } else{
          alert(data.error)
        }
        
    }
  
    // to check if token exists or not or login
    useEffect(()=>{
        const token = localStorage.getItem("token") // get from localstorage
        if (!token){ // if token exists // if token doesnt exist, remove token from local storage and go back to login
            localStorage.removeItem("token")
            navigate("/login")
          } else{
            populatePage() // if token exists, do this
          }
        }
    , [])
    ///////////////////////////

    const handleSubmit = async (e) =>{
        e.preventDefault() // prevents from refreshing
        // validation
        // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        //     return setError("Passwords do not match")
        // }
        const response = await fetch(`${BACKEND_BASE_URL}/user/api/${userId}`,
         {
          method: "PUT",
          
          body: JSON.stringify({
            
            email : email,
            // password : password
          }),
          headers:{
            "Content-Type": "application/json",
          },
        }
        )
        const data = await response.json()
        
        
        navigate("/dashboard")
        


    }


  return (
  
    <>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
            
            {error && <Alert variant="danger">{error}</Alert> }
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required
                    defaultValue={email} onChange={(e)=>setEmail(e.target.value)} />
                </Form.Group>

                {/* <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef}  
                     
                            placeholder="Leave black to keep the same"
                    />
                </Form.Group>

                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef}  
                        placeholder="Leave black to keep the same"
                    />
                </Form.Group> */}

                <Button disabled={loading} className="w-100 mt-3" type="submit">Update</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        <Link to="/dashboard">Cancel</Link>
    </div>

</>
    )
};

export default UpdateProfile;
