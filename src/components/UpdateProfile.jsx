import React, {useRef, useState} from "react"
import {Form, Button, Card, Alert} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import GeneralContext from "../context/GeneralContext"


const UpdateProfile = () => {

    const { userContext } = useContext(GeneralContext);
    const [
            name, setName,
            email, setEmail,
            password, setPassword,
            userId, setUserId,
            role, setRole] = userContext

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault() // prevents from refreshing
        // validation
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        
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
                    defaultValue={email} />
                </Form.Group>

                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef}  
                        placeholder="Leave blank to keep the same"
                    />
                </Form.Group>

                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef}  
                        placeholder="Leave blank to keep the same"
                    />
                </Form.Group>

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
