import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../pages/Cart';
import { useDispatchCart, useCart } from '../Components/ContextReducer';

const NavBar = () => {

  let dispatch=useDispatchCart();
  let data = useCart();
  const [cartView,setcartView] = useState(false);

  const navBarStyle = {
    backgroundColor: '#2E8B57',
    color: 'white',
    paddingLeft: '1%',
    paddingRight: '1%',
  };

  const navigate = useNavigate();

  const brandStyle = {
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginRight: 'auto', // Pushes brand to the leftmost side
  };

  const authButtonsStyle = {
    display: 'flex',
    marginLeft: 'auto', // Pushes buttons to the right
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    dispatch({type:"DROP"})
    navigate("/login");
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '15px', // Add right margin to links
  };

  const buttonStyle = {
    marginLeft: '5px', // Add left margin to buttons
  };

  const logoutButtonStyle = {
    color: 'white',
    backgroundColor: 'red',
    border: 'none',
    marginLeft: '5px', // Add left margin to buttons
  };



  return (
    <Navbar expand="lg" style={navBarStyle}>
      <Container fluid className="p-0">
        <Navbar.Brand as={NavLink} to="/" style={brandStyle}>GoFood</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" exact to="/" style={linkStyle}>Home</NavLink>
            {(localStorage.getItem("authToken")) &&
              <NavLink className="nav-link" exact to="/myorder" style={linkStyle}>My Orders</NavLink>
            }
          </Nav>
          <div style={authButtonsStyle}>
            {(localStorage.getItem("authToken")) ?
              <div style={authButtonsStyle}>
                <Button variant="light" style={buttonStyle} onClick={()=>{setcartView(true)}}>My Cart {" "}
                <Badge pill bg="danger" className="badge-notification">
                  {data.length}
                </Badge>
                </Button>
                {cartView && (
                  <Modal onClose={() => setcartView(false)} children={<Cart/>}>
                  </Modal>
                )}
                <Button variant="light" as={NavLink} to="/login" style={logoutButtonStyle} onClick={handleLogOut}>Log Out</Button>
              </div>
              :
              <div style={authButtonsStyle}>
                <Button variant="light" as={NavLink} to="/login" style={buttonStyle}>Log In</Button>
                <Button variant="light" as={NavLink} to="/createuser" style={buttonStyle}>Register</Button>
              </div>
            }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
