import React, { useState, useEffect } from 'react';
import Product from './Product';
import Modal from "./AddProduct";
import ModalOrder from "./AddOrder";
import Order from './Order';

function Content({ token }) {
  const [activeSection, setActiveSection] = useState('Products'); // Track active section NAVBAR

  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenOrder, setModalOpenOrder] = useState(false);
  

  // Define the updateProductList function
  const updateProductList = () => {
    fetch('http://localhost:3000/products/', {
        headers: {
            'Authorization': 'Baerer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const updatedProducts = data.products.map(product => ({
            ...product,
            productImage: `http://localhost:3000/${product.productImage.replace("C:/Users/Ruffa Mae Mendoza/OneDrive\Desktop/SYSARCH GITHUB/node-rest-shop/", "")}`
        }));
        setProductList(updatedProducts);
    })
    .catch(error => setError(error.message));
  };

  /* ************************************************************************************************** */
  /* ************************************************************************************************** */

  const [orderList, setOrderList] = useState([]);

  const updateOrderList = () => {
    fetch('http://localhost:3000/orders/', {
      headers: {
        'Authorization': 'Baerer ' + token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setOrderList(data.orders);
      })
      .catch(error => setError(error.message));
  };

useEffect(() => {
  if (activeSection === 'Products') {
    updateProductList();
  } else {
    updateOrderList();
  }
}, [token, activeSection]);

if (error) {
  return <div>Error: {error}</div>;
}

  return (
    <>
      <div className="topnav">
        <a className={activeSection === 'Products' ? 'active' : ''} onClick={() => setActiveSection('Products')}>Products</a>
        <a className={activeSection === 'Orders' ? 'active' : ''} onClick={() => setActiveSection('Orders')}>Orders</a>
      </div>

      {activeSection === 'Products' && (
        <div>
          <h1 className="header">Products Information</h1>

          <div className="App">
            <button className="openModalBtn" onClick={() => setModalOpen(true)}> Add Product </button>

            {modalOpen && <Modal setOpenModal={setModalOpen} token={token} updateProductList={updateProductList} />}
          </div>

          <div className="list-container">
            {productList.map(product => (
              <Product
                key={product._id}
                _id={product._id}
                name={product.name}
                price={product.price}
                productImage={product.productImage}
                token={token} // Pass the token
                updateProductList={updateProductList}
              />
            ))}
          </div>
        </div>
      )}

      {activeSection === 'Orders' && (

        <div>
          <h1 className="header">Orders Information</h1>
            {error && <div>Error: {error}</div>}

            <div className="App">
            <button className="openModalBtn" onClick={() => setModalOpenOrder(true)}> Add Order </button>

            {modalOpenOrder && <ModalOrder setOpenModalOrder={setModalOpenOrder} token={token} updateOrderList={updateOrderList} />}
          </div>

          <div className="list-container">
              {orderList.map(order => (
                  <Order
                      key={order._id}
                      id={order._id}
                      productId={order.product._id}
                      productName={order.product.name}
                      productPrice={order.product.price}
                      quantity={order.quantity}
                      token={token}
                      updateOrderList={updateOrderList}
                  />
              ))}
            </div>
        </div>
      )}
    </>
  );
}

export default Content;
