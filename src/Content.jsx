import React, { useState, useEffect } from 'react';
import Product from './Product';

function Header() {
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/products/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const updatedProducts = data.product.map(product => ({
          ...product,
          productImage: `http://localhost:3000/${product.productImage.replace("C:/Users/Jclop/Videos/SYSARCH/Midterm Project Practice/node-rest-shop/", "")}`
        }));
        setProductList(updatedProducts);
      })
      .catch(error => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1 className="header">Products</h1>

      <div className="list-container">
        {productList.map(product => (
          <Product
            key={product._id}
            _id={product._id}
            name={product.name}
            price={product.price}
            productImage={product.productImage}
          />
        ))}
      </div>
    </>
  );
}

export default Header;