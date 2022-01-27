import React, {useRef, useState} from "react"
import {Form, Button, Card, Alert} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import GeneralContext from "../context/GeneralContext"


const Register = () => {
    const { userContext } = useContext(GeneralContext);
    const [name, setName,
          email, setEmail,
          password, setPassword] = userContext
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [loading, setLoading] = useState(false)
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    const navigate = useNavigate()

     const registerUser = async(event) =>{
        event.preventDefault() // prevents refreshing app
        const response = await fetch("http://localhost:5000/user/api/register",
         {
          method: "POST",
          
          body: JSON.stringify({
            name : name,
            email : email,
            password : password
          }),
          headers:{
            "Content-Type": "application/json",
          },
        }
        )
        const data = await response.json()
        
        if (data.status === "ok"){
          navigate("/login")
        }
        //console.log(data)
    }


  return (
    
    <>  
      <Card>
        <Card.Body>
        <h2 className="text-center mb-4">Register</h2>

        <Form onSubmit={registerUser}>
                    <Form.Group id="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name"  ref={nameRef} required value={name} onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-3" type="submit">Register</Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>

        </Card.Body>
      </Card>




    </>
    
    )
};

export default Register;
