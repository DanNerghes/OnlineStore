import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { AuthContext } from '../../features/login-register/AuthContext';
import { CurrencyContext } from '../currency/CurrencyContext';
import { roundUp } from '../../utils/helpers';

export default function MyProducts() {
    const db = firebase.firestore();
    const [products, setProducts] = useState([])
    const {user} = useContext(AuthContext);
    const {currencyExchange} = useContext(CurrencyContext);

    useEffect(() => {
        if(user){
            const items = []
            db.collection("products").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    items.push( {...doc.data(), id:doc.id} )
                });
                setProducts(items.filter(product => product.owner === user.email))  
            });
        }
    }, [db, user])

    async function handleRemove(productToDelete) {
        try {
            await db.collection('products').doc(productToDelete.id).delete();
            if(productToDelete.imgUrl) {
                firebase.storage().refFromURL(productToDelete.imgUrl).delete();
            }
        } catch (err) {
            console.log(err);
        }
        setProducts(products.filter(item => item !== productToDelete))
    }

    return (       
        <div className='row justify-content-start align-items-stretch'>
            { products.length > 0 ? products.map(product => (
                <div className='col-3-lg col-4-md col-6-sm ml-2 mr-2' style={{width:'13rem'}} key={product.id}>
                    <div className="card mt-3 mb-2 p-3">
                        <img alt={product.productName} className="card-img-top" src={product.imgUrl} />
                        <div className="card-body">
                            <h5 className="card-title">{product.productName}</h5>
                            <p className="card-text">Category: {product.productCategory}</p>
                            <p className="card-text">On stock: {product.availableInStock}</p>
                            { roundUp(product.price * currencyExchange.rate) } {currencyExchange.currency}
                            <Link className='btn btn-warning btn-block' to={`/myproducts/${product.id}`}>Edit </Link>
                            <button className='btn btn-danger btn-block' onClick={() => handleRemove(product)} >Remove</button>
                        </div>
                    </div>
                </div>
                )
            ):(
                <div className='d-flex-row text-center mt-5 w-100'>
                    <h4>You have no products added yet...</h4>
                    <Link className='btn btn-primary col-6' to='/addproduct'>Click here to add</Link>
                </div>
                )} 
        </div>    
    )
}
