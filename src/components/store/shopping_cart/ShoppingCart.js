import React, { useContext } from "react";
import ShoppingCartProduct from "./ShoppingCartProduct";
import { Modal, Button, Col, Row, Image } from "react-bootstrap";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { CurrencyContext } from "../../currency/CurrencyContext";
import ShoppingCartQty from "./ShoppingCartQty";
import ShoppingCartRemoveProduct from "./ShoppingCartRemoveProduct";

export default function ShoppingCart() {
  const { shoppingCart, closeShoppingCart, productsToCart, total } = useContext(ShoppingCartContext);
  const {
    currencyExchange: { currency },
  } = useContext(CurrencyContext);

  function handleBuyItems() {
    console.log("buy all");
  }

  return (
    <Modal show={shoppingCart.open} onHide={closeShoppingCart} size="lg" ref={this} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping cart</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        {productsToCart.length > 0 ? (
          productsToCart.map((product) => {
            return (
              <div key={product.id}>
                <Row>
                  <Image className="m-2" alt={product.productName} src={product.imgUrl} width="100"></Image>
                  <div className="d-flex-column">
                    <ShoppingCartProduct product={product} />
                    <ShoppingCartQty product={product} />
                    <ShoppingCartRemoveProduct product={product} />
                  </div>
                </Row>
                <hr />
              </div>
            );
          })
        ) : (
          <Col>
            <h3>You have no products in cart yet!</h3>
          </Col>
        )}
      </Modal.Body>
      {productsToCart.length > 0 && (
        <Modal.Footer>
          <h3>
            {total} {currency}
          </h3>
          <Button onClick={handleBuyItems}>Go to payment</Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
