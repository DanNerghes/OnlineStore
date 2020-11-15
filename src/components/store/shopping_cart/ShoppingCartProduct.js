import React, { useContext } from "react";
import { roundUp } from "../../../utils/helpers";
import { CurrencyContext } from "../../currency/CurrencyContext";

export default function ShoppingCartProduct({ product }) {
    const {
        currencyExchange,
        currencyExchange: { currency },
    } = useContext(CurrencyContext);

    return (
        <h5>
            {product.productName} -
            <small>
                {roundUp(product.price * currencyExchange.rate)} {currency}
            </small>
        </h5>
    );
}
