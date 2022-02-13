import React from "react"
import "../App.css"
import {Form, Button, FormControl, Container, Navbar, Nav, NavDropdown} from "react-bootstrap"
import Logout from "../components/Logout"

const DefaultLayout = (props) =>{
    const session = localStorage.getItem("currentUser")
    return (
        <div >
            <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/dashboard">Ummi Bobbins</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    {/* <Nav.Link href="/dashboard">Dashboard</Nav.Link> */}
                    {/* <Nav.Link href="/signup">Sign Up</Nav.Link>
                    <Nav.Link href="/login">Log In</Nav.Link> */}
                    <NavDropdown title="Profile" id="navbarScrollingDropdown" >

                    {!session &&  
                             <NavDropdown.Item href="/login"> Log In</NavDropdown.Item>
                    }
                       {session && <NavDropdown.Item href="/logout"><Logout/> </NavDropdown.Item>
                    }
                    
                    <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
                    {/* <NavDropdown.Divider />  */}
                    {/* <NavDropdown.Item href="#action5">
                        Something else here
                    </NavDropdown.Item>  */}
                    </NavDropdown>
                    {/* <Nav.Link href="#" disabled>
                    Link
                    </Nav.Link> */}
                </Nav>
                {/* <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
                </Navbar.Collapse>
            </Container>
            </Navbar>

            <div >
                {props.children}
            </div>

        </div>
    )
}

export default DefaultLayout