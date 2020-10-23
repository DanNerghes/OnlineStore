import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthContext } from '../../features/login-register/AuthContext';
import { CurrencyContext} from '../../features/CurrencyContext'
import { roundUp } from '../../helpers'
import {ShoppingCartContext} from './ShoppingCartContext'

export default function AllProducts({selectedCategory}) {

    const db = firebase.firestore();
    const [products, setProducts] = useState([])
    const {user} = useContext(AuthContext)
    const { handleAddToCart } = useContext(ShoppingCartContext)
    const {currencyExchange} = useContext(CurrencyContext);


    useEffect(() => {
        const items = []
        db.collection("products").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                items.push( {...doc.data(), id:doc.id} )
            });
            !selectedCategory || selectedCategory === 'All' ?
            setProducts(items) :
            setProducts(items.filter(products => products.productCategory === selectedCategory))
        });
    }, [db, selectedCategory])

    if(!user){
        return (
            <>
            { products.map(product => 
                (<div className="card col-3 mt-2" key={product.id}>
                    <img className="card-img-top" src={product.imgUrl} alt={product.productName} />
                    <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                    </div>
                </div>)
            )} 
        </> 
        )
    }   
    
    return (       
        <>
            { products.filter(product => product.owner !== user.email).map(product => 
                
                (<div className="card mt-2 col-3" key={product.id}>
                    <img className="card-img-top" src={product.imgUrl} alt={product.productName} />
                    <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                        <p className="card-text">{ roundUp( product.price * currencyExchange.rate) } {currencyExchange.currency} / {product.unitMeasurement} </p>
                        <button className='btn btn-primary' onClick={() => handleAddToCart(product)}>Add to cart</button>
                        <Link className='btn btn-primary' to={`/store/${product.id}`} >View Details</Link>
                    </div>
                </div>)
            )} 
        </>    
            )
}
