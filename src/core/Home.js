import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to tshirt Store">
      <div className="row text-center">
        {/* <h1 className="text-center text-white">All of tshirts</h1> */}
        {products.map((product, index) => {
          return (
            <div key={index} className="col-3 mb-4">
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default Home;
