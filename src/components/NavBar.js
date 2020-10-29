import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import { AuthContext } from '../features/login-register/AuthContext';
import ToggleCurrency from '../components/currency/ToggleCurrency';
import { ShoppingCartContext } from './store/shopping_cart/ShoppingCartContext';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { BsPeopleCircle } from "react-icons/bs";
import {SiFoursquare} from 'react-icons/si'

import './NavBar.css'

export default function NavBar() {
    const history = useHistory();
    const {isAuthenticated, user} = useContext(AuthContext)
    const {openShoppingCart, productsToCart} = useContext(ShoppingCartContext)

    function handleLogout(e) {
        e.preventDefault();

        firebase.auth().signOut()
            .then(history.push("/login"))
            .catch(function(error) {
                console.log(error);
          });
    }

    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className='sticky-top w-100 mb-4'>
                <Container>
                    <Navbar.Brand href="/store"><SiFoursquare />Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav defaultActiveKey='/' className='w-100'>
                        {isAuthenticated ? (
                            <>
                                <Nav.Link onClick={openShoppingCart} eventKey="link-2" className='ml-md-auto'><FaShoppingCart size='30'/>
                                    {productsToCart.length > 0 && <span className="badge badge-danger">{productsToCart.length}</span>}
                                </Nav.Link>
                                <NavDropdown className='dropdown nav-item' title={ <><BsPeopleCircle size='30' /><span >{user.email}</span></> }>
                                        <Nav.Link className='dropdown-text' >Change Currency: <ToggleCurrency /></Nav.Link>
                                        <Nav.Link className='dropdown-text' href="/myproducts">Manage my products</Nav.Link>
                                        <Nav.Link className='dropdown-text' href="/addproduct">Add new Product</Nav.Link>
                                        <Nav.Link className='dropdown-text' onClick={handleLogout}>Logout</Nav.Link>
                                </NavDropdown>
                            </>
                        ): (
                            <NavDropdown className='ml-md-auto' title={ <BsPeopleCircle size='30' /> }>
                                    <Nav.Link className='dropdown-text' href="/login">Login</Nav.Link>
                                    <Nav.Link className='dropdown-text' href="/register">Register</Nav.Link>
                            </NavDropdown>
                        )}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}