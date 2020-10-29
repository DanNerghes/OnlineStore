import React, { useEffect, useState, useContext } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthContext } from '../../features/login-register/AuthContext';
import { CurrencyContext} from '../currency/CurrencyContext'
import { roundUp } from '../../utils/helpers'
import {ShoppingCartContext} from './shopping_cart/ShoppingCartContext'

export default function AllProducts({selectedCategory, filterProducts}) {

    const db = firebase.firestore();
    const [products, setProducts] = useState([])
    const {user} = useContext(AuthContext)
    const { handleAddToCart, productsToCart, handleRemoveFromCart } = useContext(ShoppingCartContext)
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
            <div className='row justify-content-center align-items-stretch'>
            { products.map(product => (
                <div className='col-3-lg col-4-md col-6-sm ml-3 mr-3' style={{width:'13rem'}} key={product.id}>
                    <div className="card mt-3 mb-2 p-3 " style={{ boxShadow:'0 5px 5px 0'}}>
                        <div style={{height:'200px'}}>
                            <img className="card-img-top" src={product.imgUrl} alt={product.productName} />
                        </div>
                        <div style={{height:'30px'}} className='mb-4'>
                            <h6 className="card-title mt-2  pb-5">{product.productName}</h6>
                        </div>
                    </div>
                </div>
            ))} 
            </div>
        )
    }   

    return (       
        <div className='row justify-content-center align-items-stretch'>
            { products.filter(product => product.owner !== user.email && product.productName.toLowerCase().includes(filterProducts)).map(product =>                 
                (<div className='col-3-lg col-4-md col-6-sm ml-3 mr-3' style={{width:'13rem'}} key={product.id}>
                    <div className="card mt-3 mb-2 p-3 " style={{ boxShadow:'0 5px 5px 0'}}>
                        <div style={{height:'200px'}}>
                            <img className="card-img-top" src={product.imgUrl} alt={product.productName} />
                        </div>
                        <div className="card-body p-0 m-0">
                            <div style={{height:'30px'}} className='mb-4'>
                                <h6 className="card-title mt-2">{product.productName}</h6>
                            </div>
                            <small className="card-text">{ roundUp( product.price * currencyExchange.rate) } {currencyExchange.currency} </small>
                            <br/><br/>
                            <div>
                                <button className='btn btn-success' 
                                    onClick={() => handleAddToCart(product)} 
                                    disabled={productsToCart.find(item => item.id === product.id)}
                                >+</button>
                                {productsToCart.find(item => item.id === product.id) && (
                                    <>
                                        <small className="alert alert-success p-2" role="alert">Added to cart!</small>
                                        <button className='btn btn-danger' 
                                        onClick={() => handleRemoveFromCart(product.id)} 
                                        >-</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>)
            )} 
        </div>    
    )
}
        