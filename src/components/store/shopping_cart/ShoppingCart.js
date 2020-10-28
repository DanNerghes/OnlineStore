import React, { useContext } from 'react'
import { Modal, Button, Col, Row, Image } from 'react-bootstrap'
import {ShoppingCartContext} from './ShoppingCartContext'
import { CurrencyContext } from '../../currency/CurrencyContext';
import { roundUp } from '../../../utils/helpers';
import {AiOutlineClose} from 'react-icons/ai'

export default function ShoppingCart() {
    const {shoppingCart, 
        closeShoppingCart, 
        productsToCart, 
        incrementProductCounter, 
        decrementProductCounter, 
        handleRemoveFromCart,
        total
    } = useContext(ShoppingCartContext)
    const  {currencyExchange, currencyExchange: {currency}} = useContext(CurrencyContext);

    function handleBuyItems() {
        console.log('buy all');
    }

    return (
        <Modal show={shoppingCart.open} onHide={closeShoppingCart} size="lg" ref={this} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Shopping cart</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                {productsToCart.length > 0 ? 
                (productsToCart.map((product) => {
                    return(
                        <div key={product.id}>
                            <Row >
                                <Col xs={1} md={1}>
                                    <Image alt={ product.productName} src={product.imgUrl} width='30'></Image>
                                </Col>
                                <Col xs={3} md={3}>
                                    {product.productName} - <small>{roundUp(product.price * currencyExchange.rate) } {currency}</small>
                                </Col>
                                <Col xs={4} md={4}>
                                    <Button variant="danger" size='sm' onClick={() => decrementProductCounter(product)} disabled={product.inShoppingCart < 2} >-</Button>
                                    <span className='m-1'>{product.inShoppingCart} {product.unitMeasurement}</span>
                                    <Button variant='primary' size='sm' onClick={() => incrementProductCounter(product)} disabled={product.inShoppingCart === parseInt(product.availableInStock)}>+</Button>
                                </Col>
    
                                <Col xs={4} md={4}>
                                    {product.inShoppingCart * roundUp( product.price * currencyExchange.rate)} {currency}
                                    <Button variant="danger" size='sm' onClick={() => handleRemoveFromCart(product.id)}><AiOutlineClose /></Button>
                                </Col>
                            </Row>
                            <hr/>
                        </div> )})) : (
                        <Col>
                            <h3>You have no products in cart yet!</h3> 
                        </Col>)}
            </Modal.Body>
            {productsToCart.length > 0 &&            
            <Modal.Footer>
                <h3>{total} {currency}</h3> 
                <Button onClick={handleBuyItems}>Go to payment</Button>
            </Modal.Footer>}
        </Modal>
    )
  }
