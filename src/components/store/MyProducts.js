import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthContext } from '../../features/login-register/AuthContext';
import { CurrencyContext } from '../../features/CurrencyContext';
import { roundUp } from '../../helpers';


export default function MyProducts() {
    const db = firebase.firestore();
    const [products, setProducts] = useState([])
    const {user} = useContext(AuthContext);
    const {currencyExchange} = useContext(CurrencyContext);

    useEffect(() => {
        const items = []
        db.collection("products").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                items.push( {...doc.data(), id:doc.id} )
            });
            setProducts(items)  
        });
    }, [db])

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
        <>
            { products.filter(product => {
                return product.owner === user.email}).map(product => 
                
                (<div className="card col-2" key={product.id}>
                    <img alt={product.productName} className="card-img-top" src={product.imgUrl} />
                    <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                        <p className="card-text">Category: {product.productCategory}</p>
                        { roundUp(product.price * currencyExchange.rate) } {currencyExchange.currency}
                        <button className='btn btn-danger' onClick={() => handleRemove(product)} >Remove</button>
                        <Link className='btn btn-warning' to={`/myproducts/${product.id}`}>Edit </Link>
                    </div>
                </div>)
            )} 
        </>    
    )
}
