import React, { useState } from "react";

function Product(props) {
  const [productName, setProductName] = useState(props.name);
  const [productPrice, setProductPrice] = useState(props.price);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    const token = props.token; // Retrieve token from props
    fetch(`http://localhost:3000/products/${props._id}`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Baerer ' + token
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      // If deletion is successful, trigger the parent component to update the product list
      props.updateProductList();
    })
    .catch(error => console.error(error));
  };

  const handleUpdate = () => {
    const token = props.token; // Retrieve token from props
    const updateData = [
      { propName: "name", value: productName },
      { propName: "price", value: productPrice }
    ];
    fetch(`http://localhost:3000/products/${props._id}`, {
      method: "PATCH",
      headers: {
        'Authorization': 'Baerer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      // If update is successful, reset editing state and trigger the parent component to update the product list
      setIsEditing(false);
      props.updateProductList();
    })
    .catch(error => console.error(error));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setProductName(props.name);
    setProductPrice(props.price);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <img className="card_image" src={props.productImage} alt="Product" />
      <h3>ID: {props._id}</h3>
      {isEditing ? (
        <>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          <button className="btnUpdate" onClick={handleUpdate}>Save</button>
          <button className="btnCancel" onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h3>Name: {props.name}</h3>
          <h3>Price: {props.price}</h3>
          <button className="btnEdit" onClick={handleEdit}>Edit</button>
          <button className="btnDelete" onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default Product;
