import React, { useContext, useState, useEffect } from 'react'
import { GiTwoCoins } from 'react-icons/gi';
import { CurrencyContext } from './CurrencyContext'

export default function ToggleCurrency() {
    const  {currencyExchange: {currency}, changeCurrency} = useContext(CurrencyContext);
    const [value, setValue] = useState(currency);

    useEffect(() => {
        setValue(currency);
    }, [currency]);

    function handleCurrencyChange(e) {
        setValue(e.target.value);
        changeCurrency(e.target.value, );
    }

    return (
        <select title={<GiTwoCoins size='30' />} value={value} onChange={handleCurrencyChange}>
            <option value="RON">RON</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
        </select>
    )
}
