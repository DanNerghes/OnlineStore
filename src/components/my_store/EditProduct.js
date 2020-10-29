import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import {v4 as uuidv4} from 'uuid'
import { CurrencyContext} from '../currency/CurrencyContext'
import useForm from '../../utils/useForm';


const initialValues = {
    imgUrl: '',
    productName: '', 
    productCategory: '', 
    price: '',
    currency: '',
    availableInStock:''
}

const validationRules = {
    productName: [{ type: 'required' }],
    productCategory: [{ type: 'required'}],
    price: [{type: 'required'}],
    availableInStock: [{type: 'required'}],
};

export default function EditProduct() {

    const db = firebase.firestore();
    const {id} = useParams()
    const history = useHistory();
    const {currencyExchange} = useContext(CurrencyContext);
    const [initialState, setinitialState] = useState(initialValues)
    const {values, errors, file, handleImage, inputProps, isFormValid} = useForm(initialState, validationRules)

    useEffect(() => {
        (async function() {
            try {
                const querySnapshot = await db.collection("products").get()
                querySnapshot.forEach(doc => {
                    if(doc.id === id){ 
                        setinitialState( {...doc.data()} )
                    }
                })
            } catch(err) {
                console.log(err);
            }    
        })()
    }, [id, db])
    
    async function handleEditItem(e) {
        e.preventDefault();
        const newInputValue = {...values};
        const picToRemove = values.imgUrl;

        if(!isFormValid()) {
            return;
        }
        
        try{
            if(file){
                const imageRef = firebase.storage().ref().child(`images/${uuidv4()}${file.name}`);
                const snapshot = await imageRef.put(file);
                const image = await snapshot.ref.getDownloadURL();
                newInputValue.imgUrl = image;
                handlePicDelete(picToRemove)
            }
            await db.collection('products').doc(id).set(newInputValue);
            history.push("/myproducts");
        } catch(err) {
            console.log(err);
        }
    }

    async function handlePicDelete(toDelete) {
        try {
            await firebase.storage().refFromURL(toDelete).delete();

        } catch (err) {
            console.log(err);
        }   
    }

    return (
            <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-10 col-lg-8'>
                    <form onSubmit={handleEditItem} className='form-style'>
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
                            <div className="form-group col-12 col-md-7 col-auto">
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
                        <button className='btn btn-warning form-control' type='submit'>Edit </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
