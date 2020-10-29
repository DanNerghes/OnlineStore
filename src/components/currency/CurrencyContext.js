import React, { useEffect, useState } from 'react'

const defaultValue = JSON.parse(localStorage.getItem('currency')) || {
    currency: 'RON',
    rate: 1
}

const CurrencyContext = React.createContext(defaultValue)

function CurrencyContextProvider({children}) {

    const [currencyExchange, setCurrencyExchange] = useState(defaultValue)

    async function changeCurrency(newCurrency) {
        const data = await fetch(`https://api.exchangeratesapi.io/latest?symbols=${newCurrency}&base=RON`)
            .then(res => res.json())
            
        setCurrencyExchange({
            currency: newCurrency,
            rate: data.rates[newCurrency],
        });
        return data.rates[newCurrency];
    }

    useEffect(() => {
        localStorage.setItem('currency', JSON.stringify(currencyExchange))
    }, [ currencyExchange])

    return (
        <CurrencyContext.Provider value={ {currencyExchange, changeCurrency} }>
            {children}
        </CurrencyContext.Provider>
    )
}

export {CurrencyContext, CurrencyContextProvider}
        