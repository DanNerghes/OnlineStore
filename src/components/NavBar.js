import React, { useContext } from 'react'
import {Link, NavLink, useHistory} from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import { AuthContext } from '../features/login-register/AuthContext';
import ToggleCurrency from '../features/ToggleCurrency';
import { ShoppingCartContext } from './store/ShoppingCartContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function NavBar() {
    const history = useHistory();
    const {isAuthenticated, user} = useContext(AuthContext)
    const {openShoppingCart} = useContext(ShoppingCartContext)

    function handleLogout(e) {
        e.preventDefault();

        firebase.auth().signOut()
            .then(history.push("/login"))
            .catch(function(error) {
                console.log(error);
          });
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark ">
            <div className="container">
                <Link className="navbar-brand" to='/home' >Navbar</Link>
                <ul className="navbar-nav w-100 ">
                    <li className='nav-item'>
                        <NavLink className="nav-link" exact to="/store" >Home</NavLink>  
                    </li>

                    {isAuthenticated ? (
                        <>
                            <li className='nav-item'>
                                <NavLink className="nav-link" exact to="/myproducts">My Products</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className="nav-link" exact to="/addproduct">Add New Product</NavLink>
                            </li>
                            <li className='nav-item d-flex align-items-center'><span className='nav-link'>Welcome {user.email}</span>
                                <a className="nav-link" href="/" onClick={handleLogout} >Logout</a>
                            </li>
                            <li className='nav-item d-flex align-items-center'>
                                <button onClick={openShoppingCart} >{ <FaShoppingCart color='orange' /> }</button>
                            </li>
                            <ToggleCurrency />
                        </>    
                    ) : (
                        <>
                            <li className='nav-item'> 
                                <NavLink className="nav-link" exact to="/login">Login</NavLink>
                            </li>
                            <li className='nav-link'>|</li>
                            <li className='nav-item'>
                                <NavLink className="nav-link" exact to="/register">Register</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}
