import React, {useEffect} from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import {Form, Button, Card, Alert} from "react-bootstrap"
import { useContext } from "react"
import GeneralContext from "../../context/GeneralContext"

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

const Parent = (props) => {
    const { quote,
            setQuote,
            tempQuote,
            setTempQuote,
            updateQuote,
            handleLogout} = props

    const { userContext } = useContext(GeneralContext);
    const [
            name, setName,
            email, setEmail,
            password, setPassword,
            userId, setUserId,
            role, setRole] = userContext

    const navigate = useNavigate()

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

        
  return (
      <>
    <Card>
          <Card.Body>
              <h2 className="text-center mb-4">Your quote: {quote || "No quote found"} </h2>
              <h2 className="text-left mb-4">Your email: {email}</h2>
              <h2 className="text-left mb-4">Your user ID: {userId}</h2>
              <h2 className="text-left mb-4">Your name: {name}</h2>
              <h2 className="text-left mb-4">Your role: {role}</h2>
              <Form onSubmit={updateQuote}>
                    <Form.Group id="name">
                        <Form.Label>Add Quote</Form.Label>
                        <Form.Control type="text" placeholder="Quote" value={tempQuote} onChange={(e)=>setTempQuote(e.target.value)}/>
                    </Form.Group>
                    <Button  className="w-100 mt-3" type="submit">Update Quote</Button>
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
              </Form>
              </Card.Body>

          </Card>
          <div className="w-100 text-center mt-2">
                    <Link to="/login"><Button variant="link" onClick={handleLogout}>Log Out</Button></Link>
                </div>

                </>
  )
};

export default Parent;


