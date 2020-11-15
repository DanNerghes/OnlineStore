import React, { useContext } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { CurrencyContext } from "../../currency/CurrencyContext";
import { roundUp } from "../../../utils/helpers";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "react-bootstrap";

export default function ShoppingCartRemoveProduct({ product }) {
    const { handleRemoveFromCart } = useContext(ShoppingCartContext);
    const {
        currencyExchange,
        currencyExchange: { currency },
    } = useContext(CurrencyContext);
    return (
        <div className="float-right">
            {product.inShoppingCart *
                roundUp(product.price * currencyExchange.rate)}{" "}
            {currency}
            <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveFromCart(product.id)}
            >
                <AiOutlineClose />
            </Button>
        </div>
    );
}
