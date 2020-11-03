import React, { useContext, useEffect, useState } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Form, FormControl, Nav, Navbar, NavItem } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import useForm from '../utils/useForm';
import {AuthContext} from '../features/login-register/AuthContext'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

const initialValues={filter:''}

export default function Sidebar({setSelectedCategory, setFilterProducts}) {
    const db = firebase.firestore();
    const [allCategories, setAllCategories] = useState([]);
    const {values, inputProps} = useForm(initialValues)
    const {user} = useContext(AuthContext)

    useEffect(() => {
        setFilterProducts(values.filter);
    }, [values, setFilterProducts])

    useEffect(() => {
        const categoriesArr = []
        db.collection("products").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    categoriesArr.push( {...doc.data(), id:doc.id} )
                });

        function sortCategories(arr) {
            const newArr = ['All']
            for(const item of arr) {
                if(!newArr.includes(item.productCategory)){
                    newArr.push(item.productCategory);
                }
            }
            return newArr
        }
        setAllCategories(sortCategories(categoriesArr))  
            })
    }, [db])

    return (
        <>
            <Navbar collapseOnSelect expand="md" className='flex-column navbar-collapse' title='Categories'>
                <NavbarCollapse id="responsive-navbar-nav"></NavbarCollapse>
                    <NavItem>
                        {user && (
                            <Form className='d-flex' >
                                <span className='mr-2'><BsSearch  size='20'/></span>
                                <FormControl type="text" 
                                    placeholder="Search" 
                                    className="mr-sm-2"
                                    {...inputProps('filter')}/>
                            </Form>
                        )}
                    </NavItem>
                    <br/>
                    <NavItem>
                        <h5>Categories: </h5>
                        {allCategories.map( obj => {
                            return (
                                <Nav.Link variant='pills' key={obj} onClick={() => setSelectedCategory(obj)}>{obj}</Nav.Link>
                            )
                        })}
                    </NavItem>
            </Navbar>
        </>
    )
}
