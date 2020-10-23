import React, { useState } from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";
import { useLocation, useHistory } from 'react-router-dom';

const initialValues = {email:'', password:'', retypePassword:''}

export default function Authentification() {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialValues);
    const [alert, setAlert] = useState(null);
    const {pathname} = useLocation();
    const history = useHistory();

    const isRegister = pathname === '/register';

    function handleInput(e) {
        setErrors({...errors, [e.target.name] : '' });
        setValues({ ...values, [e.target.name] : e.target.value });
    }

    function isFormValid() {
        let isValid = true;
        const newErrors = {...errors};
        if(!values.email) {
            newErrors.email = 'Email adress is required.';
            isValid = false;
        }

        if(!values.password) {
            newErrors.password = 'Please provide a password.';
            isValid = false;
        }

        if(isRegister && values.password !== values.retypePassword) {
            newErrors.retypePassword = 'The passwords did not match.';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    }

    function handleSubmit(e) {
        e.preventDefault()
        setAlert(null)

        if(!isFormValid()) {
            return;
        }

        if(isRegister) {
            if(values.password !== values.retypePassword) {

            }
            firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
                .then(history.push("/store"))
                .catch(function(error) {
                    setAlert({type: 'danger', message: error.message});
            });
        } else {
            firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                .then(history.push("/store"))
                .catch(function(error) {
                    setAlert({type: 'danger', message: error.message});
                });
        }
    }

    return (

        <form className='mt-3' onSubmit={handleSubmit} >
            { alert?.message && (
                <div className={ `alert alert-${alert.type}` } role="alert">{ alert.message }</div>
            )}
            <h1> {isRegister ? 'Register': 'Login'} </h1>
            <div className="form-group col-6 m-1 p-0">
                <label htmlFor="email">Email address</label>
                <input type="text" className={ `form-control${errors.email && ' is-invalid'}` } id="email" name='email' value={values.email} onChange={(e) => handleInput(e)} />
                <div className="invalid-feedback">Invalid email</div>
            </div>
            <div className="form-group col-6 m-1 p-0">
                <label htmlFor="password">Password</label>
                <input type="password" className={ `form-control${errors.password && ' is-invalid'}` } name='password' value={values.password} onChange={(e) => handleInput(e)}/>
                <div className="invalid-feedback">Invalid password</div>
            </div>
            {isRegister && (
                <div className="form-group  col-6 m-1 p-0">
                    <label htmlFor="retypePassword">Retype Password</label>
                    <input type="password" className={ `form-control${errors.retypePassword && ' is-invalid'}` } id='retypePassword' name='retypePassword' value={values.retypePassword} onChange={(e) => handleInput(e)} />
                    <div className="invalid-feedback">Password did not match</div>
                </div>
            )}
            <button type="submit" className="btn btn-primary col-6 form-control mt-3">{isRegister ? 'Register': 'Login'}</button>
        </form>
    )
}
