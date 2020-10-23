import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as firebase from "firebase/app";

import NavBar from './NavBar';
import Store from './store/Store';
import Authentification from '../features/login-register/Authentification';
import {AuthContextProvider} from '../features/login-register/AuthContext'

import 'bootstrap/dist/css/bootstrap.css';
import AddNewProduct from './store/AddNewProduct';
import MyProducts from './store/MyProducts';
import EditProduct from './store/EditProduct';
import ProductDetails from './ProductDetails';
import ShoppingCart from './store/ShoppingCart';
import { CurrencyContextProvider } from '../features/CurrencyContext';
import { ShoppingCartContextProvider } from './store/ShoppingCartContext';

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
                        <Router>
                            <NavBar />
                            <div className='container'>
                                <Route exact path='/store' component={Store} />
                                <Route exact path='/store/:id' component={ProductDetails} />
                                <Route exact path='/myproducts' component={MyProducts} />
                                <Route exact path='/myproducts/:id' component={EditProduct} />
                                <Route exact path='/addproduct' component={AddNewProduct} />
                                <Route exact path='/login' component={Authentification} />
                                <Route exact path='/register' component={Authentification} />
                            </div>
                        </Router>
                    <ShoppingCart />
                </ShoppingCartContextProvider>
            </CurrencyContextProvider>
        </AuthContextProvider>
    )
}
