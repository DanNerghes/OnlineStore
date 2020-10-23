import React, { useEffect, useState } from 'react'

const defaultValue = {
    open: false
}

const ShoppingCartContext = React.createContext(defaultValue)

const dataFromStorage = JSON.parse(localStorage.getItem('shoppingCart'))

function ShoppingCartContextProvider({children}) {
    const [shoppingCart, setShoppingCart] = useState(defaultValue)
    const [productsToCart, setProductsToCart] = useState(dataFromStorage)


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
        console.log(newCart);
        setProductsToCart(newCart)
    }

    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(productsToCart))
    }, [ productsToCart])
    
    return (
        <ShoppingCartContext.Provider value={ {shoppingCart, 
        productsToCart, 
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
