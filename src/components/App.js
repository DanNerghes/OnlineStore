import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as firebase from "firebase/app";

import NavBar from './NavBar';
import Store from './store/Store';
import Authentification from '../features/login-register/Authentification';
import {AuthContextProvider} from '../features/login-register/AuthContext'

import AddNewProduct from './my_store/AddNewProduct';
import MyProducts from './my_store/MyProducts';
import EditProduct from './my_store/EditProduct';
import ShoppingCart from './store/shopping_cart/ShoppingCart';
import { CurrencyContextProvider } from '../components/currency/CurrencyContext';
import { ShoppingCartContextProvider } from './store/shopping_cart/ShoppingCartContext';
// import Header from './Header';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import Footer from './Footer';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
  };

firebase.initializeApp(firebaseConfig);

export default function App() {
    return (
        <AuthContextProvider>
            <CurrencyContextProvider>
                <ShoppingCartContextProvider>

                        <div className='page-container'>
                            <Router>
                                <NavBar />
                                {/* <Header /> */}
                                <div className='container'>
                                    <Route exact path='/store' component={Store} />
                                    <Route exact path='/myproducts' component={MyProducts} />
                                    <Route exact path='/myproducts/:id' component={EditProduct} />
                                    <Route exact path='/addproduct' component={AddNewProduct} />
                                    <Route exact path='/login' component={Authentification} />
                                    <Route exact path='/register' component={Authentification} />
                                </div>
                            </Router>
                        </div>
                        <Footer />
                    <ShoppingCart />
                </ShoppingCartContextProvider>
            </CurrencyContextProvider>
        </AuthContextProvider>
    )
}
