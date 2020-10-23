import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid'

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import { AuthContext } from '../../features/login-register/AuthContext';
import {CurrencyContext} from '../../features/CurrencyContext'

const initialValues = {
    productName: '', 
    productCategory: '', 
    price: '',
    availableInStock:''
}

export default function AddNewProduct() {
    const db = firebase.firestore();
    const [inputValue, setInputValue] = useState(initialValues);
    const [file, setFile] = useState(null);
    const {user} = useContext(AuthContext);
    const history = useHistory()
    const {currencyExchange} = useContext(CurrencyContext);


    async function handleAddItem(e) {
        e.preventDefault()
        if (user) {
            try {
                if(file){
                    const imageRef = firebase.storage().ref().child(`images/${uuidv4()}${file.name}`);
                    const snapshot = await imageRef.put(file);
                    const imgUrl = await snapshot.ref.getDownloadURL();
                    await db.collection('products').add({
                        imgUrl,
                        owner: user.email,
                        productName: inputValue.productName,
                        productCategory: inputValue.productCategory,
                        price: inputValue.price / currencyExchange.rate,
                        availableInStock: inputValue.availableInStock,
                        unitMeasurement: inputValue.unitMeasurement,
                        inShoppingCart: 1
                    })
                    history.push("/myproducts");
                }
            } catch(err) {
                console.error(err);
            };
        }
    }

    function handleInput(e) {
        setInputValue({...inputValue, [e.target.name]: e.target.value})
    }

    function handleImage(e) {
        setFile(e.target.files[0])
    }

    return (
        <form onSubmit={handleAddItem}>
            <div className="form-group">
                <label >Product Image :</label>
                <input type="file" className="form-control-file" onChange={handleImage} />
            </div>
            <div className="form-row">
                <div className="form-group col-3">
                    <label htmlFor="inputCity">Product Name</label>
                    <input type="text" className="form-control" name='productName' value={inputValue.productName} onChange={handleInput} id="productName" />
                </div>
                <div className="form-group col-3">
                    <label htmlFor="inputState">Category</label>
                    <select id="inputState" className="form-control" name='productCategory' value={inputValue.productCategory} onChange={handleInput}>
                        <option ></option>
                        <option >Food</option>
                        <option>Fashion</option>
                        <option>Toys</option>
                        <option>Tools</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-3">
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" id="price" name='price' value={inputValue.price} onChange={handleInput} />
                    <span>{ currencyExchange.currency } </span>
                </div>
                <div className="form-group col-3">
                    <label htmlFor="unitMeasurement">UM</label>
                    <select id="unitMeasurement" className="form-control" name='unitMeasurement' value={inputValue.unitMeasurement} onChange={handleInput}>
                        <option ></option>
                        <option >pc</option>
                        <option>Kg</option>
                    </select>
                </div>
                <div className="form-group col-3">
                    <label htmlFor="availableInStock">Available</label>
                    <input type="number" className="form-control" id="availableInStock" name='availableInStock' value={inputValue.availableInStock} onChange={handleInput} />
                </div>
            </div>
            <button className='btn btn-primary form-control' type='submit'  >Add Product</button>
        </form>
    )
}
