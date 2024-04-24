import React from 'react';

function Product(props) {
  return (
    <>
      <div className="card">
        <img className="card_image" src={props.productImage} alt="Product" />
        <h3>ID: {props._id}</h3>
        <h3>Name: {props.name}</h3>
        <h3>Price: {props.price}</h3>
      </div>
    </>
  );
}

export default Product;