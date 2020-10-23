import React, { useContext, useEffect, useState } from 'react'
import * as firebase from 'firebase/app';
import { useParams } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/storage';
import { roundUp } from '../helpers';
import { CurrencyContext} from '../features/CurrencyContext'

export default function ProductDetails() {
    const db = firebase.firestore();
    const [item, setItem] = useState(null)
    const {id} = useParams()
    const {currencyExchange} = useContext(CurrencyContext);

    useEffect(() => {
        (async function() {
            try {
                const querySnapshot = await db.collection("products").get()
                querySnapshot.forEach(doc => {
                    if(doc.id === id){ 
                        setItem( {...doc.data()} )
                    }
                })
            } catch(err) {
                console.log(err);
            }    
        })()
    }, [id, db])

    if(!item) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <img src={item.imgUrl} alt={item.productName}/>
            <h1>{item.productName}</h1>
            <p> </p>
            <p>{ roundUp( item.price * currencyExchange.rate) } {currencyExchange.currency} / {item.unitMeasurement}</p>
            <p><strong>Category:</strong> {item.productCategory}</p>
            <p><strong>Available </strong>{item.availableInStock}</p>
            <button className='btn btn-primary'>Add to cart</button>
        </div>
    )
}

