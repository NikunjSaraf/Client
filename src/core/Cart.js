import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import PaymentB from "./PaymentB";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => (
    <div>
      {products ? (
        products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          );
        })
      ) : (
        <div>
          <h1 className="text-center">Add Item to cart</h1>
        </div>
      )}
    </div>
  );

  // const loadCheckout = () => (
  //   <div>
  //     <h2>This is checkout section</h2>
  //   </div>
  // );

  return (
    <Base title="Cart Page" description="Ready To Checkout">
      <div className="row text-center">
        <div className="col-6">
          {products ? loadAllProducts(products) : <h3>No Products</h3>}
        </div>
        <div className="col-6">
          {/* <StripeCheckout
            products={products}
            setReload={setReload}
            reload={reload}
          /> */}
          <PaymentB products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
