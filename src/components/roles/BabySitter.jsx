import React from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import {Form, Button, Card, Alert} from "react-bootstrap"
import { useContext } from "react"
import GeneralContext from "../../context/GeneralContext"



const BabySitter = (props) => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
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

  
  
  return (
      <>
    <Card>
          <Card.Body>
          <h1>Dashboard for BabySitters</h1>
             
              <h2 className="text-center mb-4">Your quote: {quote || "No quote found"} </h2>
              <h2 className="text-left mb-4">Your email:{user.email} </h2>
              <h2 className="text-left mb-4">Your user ID: {user._id}</h2>
              <h2 className="text-left mb-4">Your name: {user.name}</h2>
              <h2 className="text-left mb-4">Your role: {user.role}</h2>
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

export default BabySitter;


