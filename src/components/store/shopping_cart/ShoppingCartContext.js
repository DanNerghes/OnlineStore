import React, { useContext, useEffect, useState } from 'react'
import { roundUp } from '../../../utils/helpers'
import { CurrencyContext } from '../../currency/CurrencyContext';

const defaultValue = {
    open: false
}

const ShoppingCartContext = React.createContext(defaultValue)

const dataFromStorage = JSON.parse(localStorage.getItem('shoppingCart'))

function ShoppingCartContextProvider({children}) {
    const {currencyExchange} = useContext(CurrencyContext);
    const [shoppingCart, setShoppingCart] = useState(defaultValue)
    const [productsToCart, setProductsToCart] = useState(dataFromStorage)
    const [total, setTotal] = useState(0)


    function openShoppingCart() {
        setShoppingCart({
            open: true
        })
    }
    function closeShoppingCart() {
        setShoppingCart({
            open: false
        })
    }
    
    function handleAddToCart(prod) {
        if(productsToCart) {
            const newCart = [...productsToCart]   
            setProductsToCart([...newCart, prod])
        } else {
            setProductsToCart([prod])
            }
    }

    function incrementProductCounter(prod) {
        const items = [...productsToCart];
        const i = items.indexOf(prod);
        items[i] = {...prod};
        items[i].inShoppingCart++;
        setProductsToCart(items)
    }

    function decrementProductCounter(prod) {
        const items = [...productsToCart];
        const i = items.indexOf(prod);
        items[i] = {...prod};
        items[i].inShoppingCart--;
        setProductsToCart(items)
    }

    function handleRemoveFromCart(id) {
        const cloneCart = [...productsToCart]
        const newCart = cloneCart.filter(item => item.id !== id);
        setProductsToCart(newCart)
    }

    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(productsToCart))
    }, [ productsToCart])

    useEffect(() => {
        if(productsToCart) {
            const prods = [...productsToCart]
            const calcTotal = prods.reduce( (acc, item) => { 
                return acc + (item.inShoppingCart * roundUp(item.price * currencyExchange.rate))
            }, 0)
            setTotal(calcTotal)
        }
    }, [productsToCart, currencyExchange.rate])
    
    return (
        <ShoppingCartContext.Provider value={ {shoppingCart, 
        productsToCart, 
        total,
        openShoppingCart, 
        closeShoppingCart, 
        handleAddToCart, 
        incrementProductCounter,
        decrementProductCounter,
        handleRemoveFromCart
        } }>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export {ShoppingCartContext, ShoppingCartContextProvider}
