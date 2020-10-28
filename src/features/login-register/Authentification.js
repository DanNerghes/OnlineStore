import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import useForm from '../../utils/useForm'
import * as firebase from "firebase/app";
import "firebase/auth";
import './Authentification.css'

const initialValues = {
    email:'',
    password:'', 
    retypePassword:''
};


export default function Authentification() {
    
    const history = useHistory();
    const [alert, setAlert] = useState(null);
    const {pathname} = useLocation();
    const isRegister = pathname === '/register';
    const validationRules = isRegister ?
    {
        email: [{ type: 'email' }],
        password: [{ type: 'minLength' ,constraint: 6}],
        retypePassword: [{type: 'retypePassword', constraint: 'password'}],
    }:
    {
        email: [{ type: 'email' }],
        password: [{ type: 'minLength' ,constraint: 6}]
    };
    const {values, inputProps, errors, isFormValid} = useForm(initialValues, validationRules);

    function handleSubmit(e) {
        e.preventDefault()
        setAlert(null)

        if(!isFormValid()) {
            return;
        }

        if(isRegister) {
            firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
                .then(() => history.push("/store"))
                .catch(function(error) {
                    setAlert({type: 'danger', message: error.message});
                });
        } else {
            firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(() => history.push("/store"))
            .catch(function(error) {
                setAlert({type: 'danger', message: error.message});
        });
        }
    }

    return (

        <div className='container-fluid'>
            { alert?.message && (
                <div className={ `alert alert-${alert.type}` } role="alert">{ alert.message }</div>
            )}
            <div className='row justify-content-center'>
                <div className='col-12 col-sm-10 col-md-7 col-lg-4'>
                    <form className='form-style' onSubmit={handleSubmit} >
                        <h1 className='mb-3'> {isRegister ? 'Register': 'Login'} </h1>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="text" 
                                className={ `form-control ${errors.email && ' is-invalid'}` } 
                                id="email" 
                                {...inputProps('email')} 
            
                                />
                            <div className="invalid-feedback">{errors.email}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" 
                                className={ `form-control ${errors.password && ' is-invalid'}` } 
                                id="password"
                                {...inputProps('password')}
                                />
                            <div className="invalid-feedback">{errors.password}</div>
                        </div>
                        {isRegister && (
                            <div className="form-group">
                                <label htmlFor="retypePassword">Retype Password</label>
                                <input type="password" 
                                    className={ `form-control ${errors.retypePassword && ' is-invalid'}` } 
                                    id='retypePassword'
                                    {...inputProps("retypePassword")}
                                     />
                                <div className="invalid-feedback">{errors.retypePassword}</div>
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary block form-control mt-3 mb-3">{isRegister ? 'Register': 'Login'}</button>
                        {isRegister ?
                        <p>Already have an account? <a href='/login'>Go to Login</a></p>:
                        <p>Don`t have an account? <a href='/register'>Go to Register</a></p>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
