import React, { useContext } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { Button } from "react-bootstrap";

export default function ShoppingCartQty({ product }) {
    const { incrementProductCounter, decrementProductCounter } = useContext(
        ShoppingCartContext
    );

    return (
        <div className="m-3">
            <Button
                variant="danger"
                size="sm"
                onClick={() => decrementProductCounter(product)}
                disabled={product.inShoppingCart < 2}
            >
                -
            </Button>
            <span className="m-1">
                {product.inShoppingCart} {product.unitMeasurement}
            </span>
            <Button
                variant="primary"
                size="sm"
                onClick={() => incrementProductCounter(product)}
                disabled={
                    product.inShoppingCart ===
                    parseInt(product.availableInStock)
                }
            >
                +
            </Button>
        </div>
    );
}
