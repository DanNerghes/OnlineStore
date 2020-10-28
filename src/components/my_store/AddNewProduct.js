import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid'
import useForm from '../../utils/useForm'

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import { AuthContext } from '../../features/login-register/AuthContext';
import {CurrencyContext} from '../currency/CurrencyContext'

const initialValues = {
    productName: '', 
    productCategory: '', 
    price: '',
    unitMeasurement:'',
    availableInStock:''
}

const validationRules = {
    productName: [{ type: 'required' }],
    productCategory: [{ type: 'required'}],
    price: [{type: 'required'}],
    unitMeasurement: [{type: 'required'}],
    availableInStock: [{type: 'required'}],
};

export default function AddNewProduct() {
    const db = firebase.firestore();
    const {user} = useContext(AuthContext);
    const history = useHistory()
    const {currencyExchange} = useContext(CurrencyContext);

    const {values, errors, file, handleImage, inputProps, isFormValid} = useForm(initialValues, validationRules)

    async function handleAddItem(e) {
        e.preventDefault()

        if(!isFormValid()) {
            return;
        }

        if (user) {
            try {
                if(file){
                    const imageRef = firebase.storage().ref().child(`images/${uuidv4()}${file.name}`);
                    const snapshot = await imageRef.put(file);
                    const imgUrl = await snapshot.ref.getDownloadURL();
                    await db.collection('products').add({
                        imgUrl,
                        owner: user.email,
                        productName: values.productName,
                        productCategory: values.productCategory,
                        price: values.price / currencyExchange.rate,
                        availableInStock: values.availableInStock,
                        unitMeasurement: values.unitMeasurement,
                        inShoppingCart: 1
                    })
                    history.push("/myproducts");
                }
            } catch(err) {
                console.error(err);
            };
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-10 col-lg-8'>
                    <form onSubmit={handleAddItem} className='form-style'>
                        <div className="form-group">
                            <label >Product Image :</label>
                            <input type="file" 
                                className="form-control-file" 
                                onChange={handleImage} />
                        </div>  
                        <div className="form-row">
                            <div className="form-group col-12 col-md-9">
                                <label className='sr-only' htmlFor="productName">Product Name</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepand">
                                        <div className="input-group-text">Product Name</div>
                                    </div>
                                    <input type="text" 
                                    className={ `form-control ${errors.productName && ' is-invalid'}` } 
                                    id="productName"
                                    {...inputProps('productName')}
                                     />
                                     <div className="invalid-feedback">{errors.productName}</div>
                                </div>
                            </div>
                            <div className="form-group col-12 col-md-9">
                                <label className='sr-only' htmlFor="category">Category</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepand">
                                        <div className="input-group-text">Category</div>
                                    </div>
                                    <input type='text'
                                    id="category" 
                                    className={ `form-control ${errors.productCategory && ' is-invalid'}` }
                                    {...inputProps('productCategory')} />
                                     <div className="invalid-feedback">{errors.productCategory}</div>
                                </div>
                            </div>
                            <div className="form-group col-12 col-md-7 col-auto">
                                <label className='sr-only' htmlFor="price">Price</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <div className="input-group-text">Price</div>
                                    </div>
                                    <input type="number" 
                                        className={ `form-control ${errors.price && ' is-invalid'}` }  
                                        id="price" 
                                        {...inputProps('price')} />
                                    <div className="input-group-append">
                                        <div className="input-group-text">{ currencyExchange.currency }</div>
                                    </div>
                                    <div className="invalid-feedback">{errors.price}</div>
                                </div>
                            </div>
                            <div className="form-group col-10 col-md-6 col-auto">
                                <label className='sr-only' htmlFor="unitMeasurement">UM</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <div className="input-group-text">UM</div>
                                    </div>
                                    <select id="unitMeasurement" 
                                        className={ `form-control ${errors.unitMeasurement && ' is-invalid'}` } 
                                        {...inputProps('unitMeasurement')} >
                                        <option ></option>
                                        <option >pc</option>
                                        <option>Kg</option>
                                    </select>
                                    <div className="invalid-feedback">{errors.unitMeasurement}</div>
                                </div>
                            </div>
                            <div className="form-group col-10 col-md-6 col-auto">
                                <label className='sr-only' htmlFor="availableInStock">Available</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <div className="input-group-text">Available</div>
                                    </div>
                                    <input type="number" 
                                        className={ `form-control ${errors.availableInStock && ' is-invalid'}` } 
                                        id="availableInStock" 
                                        {...inputProps('availableInStock')} />
                                    <div className="invalid-feedback">{errors.availableInStock}</div>
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-primary form-control' type='submit'>Add </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
