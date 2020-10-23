import React, { useContext } from 'react'
import { Modal, Button, Col, Row, Image } from 'react-bootstrap'
import {ShoppingCartContext} from './ShoppingCartContext'
import { CurrencyContext } from '../../features/CurrencyContext';
import { roundUp } from '../../helpers';


export default function ShoppingCart() {
    const {shoppingCart, 
        closeShoppingCart, 
        productsToCart, 
        incrementProductCounter, 
        decrementProductCounter, 
        handleRemoveFromCart
    } = useContext(ShoppingCartContext)
    const  {currencyExchange, currencyExchange: {currency}} = useContext(CurrencyContext);

    function handleBuyItems() {
        console.log('buy all');
    }

    return (
        <Modal show={shoppingCart.open} onHide={closeShoppingCart} size="lg" ref={this}>
            <Modal.Header closeButton>
                <Modal.Title>Shopping cart</Modal.Title>
            </Modal.Header>

            <Modal.Body className="show-grid">
                {productsToCart && productsToCart.map((product) => {
                    return(
                        <Row key={product.id}>
                            <Col xs={1} md={1}>
                                <Image alt={ product.productName} src={product.imgUrl} width='30'></Image>
                                {product.productName}
                            </Col>
                            
                            <Col xs={3} md={3}>
                                {roundUp(product.price * currencyExchange.rate) } {currency} / {product.unitMeasurement}
                            </Col>
                            
                            <Col xs={4} md={4}>
                            <Button variant="danger" onClick={() => decrementProductCounter(product)}>-</Button>
                            <span className='m-1'>{product.inShoppingCart} {product.unitMeasurement}</span>
                            <Button variant='primary' size='sm' onClick={() => incrementProductCounter(product)}>+</Button>
                            </Col>

                            <Col xs={3} md={3}>
                            {product.inShoppingCart * roundUp( product.price * currencyExchange.rate)} {currency}
                            <Button variant="danger" onClick={() => handleRemoveFromCart(product.id)}>Remove</Button>
                            </Col>
                        </Row>
                        )})}                        
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <h3>Total = </h3> 
                </Row>
                <Row>
                <Button onClick={handleBuyItems}>Buy</Button>

                </Row>
            </Modal.Footer>
        </Modal>
    )
}
