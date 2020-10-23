import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import {v4 as uuidv4} from 'uuid'
import { CurrencyContext} from '../../features/CurrencyContext'


const initialValues = {
    imgUrl: '',
    productName: '', 
    productCategory: '', 
    price: '',
    currency: '',
    unitMeasurement: '',
    availableInStock:''
}

export default function EditProduct() {

    const db = firebase.firesotre();
    const [inputValue, setInputValue] = useState(initialValues);
    const [file, setFile] = useState(null)
    const {id} = useParams()
    const history = useHistory();
    const {currencyExchange} = useContext(CurrencyContext);


    useEffect(() => {
        (async function() {
            try {
                const querySnapshot = await db.collection("products").get()
                querySnapshot.forEach(doc => {
                    if(doc.id === id){ 
                        setInputValue( {...doc.data()} )
                    }
                })
            } catch(err) {
                console.log(err);
            }    
        })()
    }, [id, db])
    
    function handleInput(e) {
        setInputValue({...inputValue, [e.target.name]: e.target.value})
    }

    function handleImage(e) {
        setFile(e.target.files[0])
    }

    async function handleEditItem(e) {
        e.preventDefault();
        const newInputValue = {...inputValue};
        const picToRemove = inputValue.imgUrl;

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
        <form onSubmit={handleEditItem}>
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
                        <option defaultValue>Food</option>
                        <option>Fashion</option>
                        <option>Toys</option>
                        <option>Tools</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-4">
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" id="price" name='price' value={inputValue.price} onChange={handleInput} />
                    <span>{ currencyExchange.currency } </span>
                </div>
                <div className="form-group col-3">
                    <label htmlFor="inputState">UM</label>
                    <select id="inputState" className="form-control" name='unitMeasurement' value={inputValue.unitMeasurement} onChange={handleInput}>
                        <option defaultValue>Piece</option>
                        <option>Kg</option>
                    </select>
                </div>
                <div className="form-group col-3">
                    <label htmlFor="inputCity">Available</label>
                    <input type="number" className="form-control" id="inputCity" name='availableInStock' value={inputValue.availableInStock} onChange={handleInput} />
                </div>
            </div>
            <button className='btn btn-warning' type='submit'>Edit Item</button>
        </form>
    )
}
