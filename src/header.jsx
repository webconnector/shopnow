import 'boxicons/css/boxicons.min.css';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { PaystackButton } from 'react-paystack';
// import { useHistory } from 'react-router-dom';

function Header({ cartVisible, cartItems, removeItemFromCart, updateQuantity, toggleCart }) {

    // Include at the top level of your component file
    Modal.setAppElement('#root'); // Use the root element or another appropriate element

    // Initialize useHistory
    // const history = useHistory(); 
    
    // state to track whether the modal is open or closed 
    const [isModalOpen, setModalOpen] = useState(false);

    // function to handle opening and closing the modal 
    const toggleModal = () => {
        console.log('Before Toggle:', isModalOpen);
        setModalOpen(!isModalOpen);
        console.log('After Toggle:', isModalOpen);
      };
      

    // Function to calculate the total number of items in the cart
    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const generateReference = () => {
        // Implement your reference generation logic here
        return `${Math.floor(Math.random() * 1000000) + 1}`;
    };

    // Function to handle Paystack payment completion or failure
    const handlePaymentCallback = (response) => {
    console.log(response); // Handle success or failure callback
    toggleModal(); // Close the modal after payment

    // Redirect back to the home page
    history.replace('./index.html'); // Replace with the actual path
    };

  return (
    <header>
      {/* Navigation  */}
      <div className='bg-gray-100'>
        <div className="nav  container p-6">
          <a href="#" className="logo">ShopNow</a>

          {/* Checkout icon and count */}
          <div>
            <i className="bx bx-shopping-bag" id="cart-icon" onClick={toggleCart}>
              {cartItems.length > 0 && (
                <span className="cart-count">{calculateTotalItems()}</span>
              )}
            </i>
          </div>

          {/* cart section  */}
          {cartVisible && (
            <div className="cart">
              <h2 className="cart-title">Your cart</h2>

              {/* cart content  */}
              <div className="cart-content overflow-y-auto max-h-72">
                {cartItems.map((item) => (
                  <div className="cart-box" key={item.id}>
                    <img src={`./images/${item.image}`} alt={item.name} className="cart-img" />
                    <div className="detail-box">
                      <div className="cart-product-name">{item.name}</div>
                      <div className="cart-product-price">{`N${item.price}`}</div>
                      <input
                        type="number"
                        value={item.quantity}
                        className="cart-quantity"
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                        id='item-quantity'
                      />
                    </div>

                    {/* remove cart  */}
                    <i className="bx bxs-trash-alt cart-remove" onClick={() => removeItemFromCart(item.id)}></i>
                  </div>
                ))}
              </div>

              {/* total  */}
              <div className="total mt-8">
                <div className="total-title">Total:</div>
                <div className="total-price">{`N${calculateTotal()}`}</div>
              </div>

              {/* Checkout button */}
              <button
                type="button"
                className="rounded w-full mt-4 btn-buy"
                onClick={toggleModal}
              >
                Checkout
              </button>

              <i className="bx bx-x" id="close-cart" onClick={toggleCart}></i>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <Modal
            isOpen={isModalOpen}
            onRequestClose={toggleModal}
            contentLabel="Checkout Modal"
            style={{
                overlay: {
                  zIndex: 1000, // Set a higher z-index for the overlay
                },
                content: {
                  zIndex: 1001, // Set a higher z-index for the modal content
                },
              }}
        >
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

        {/* Product list in the modal */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="font-semibold">Product</div>
          <div className="font-semibold">Quantity</div>
          <div className="font-semibold">Price</div>

          {cartItems.map((item) => (
            <React.Fragment key={item.id}>
              <div>{item.name}</div>
              <div>{item.quantity}</div>
              <div>{`N${item.price * item.quantity}`}</div>
            </React.Fragment>
          ))}
        </div>

        {/* Overall Total */}
        <div className="text-right font-semibold mb-4">
          Overall Total: N{calculateTotal()}
        </div>

        {/* Paystack Button */}
        <PaystackButton
          text="Proceed to Pay"
          className="btn-buy"
          callback={handlePaymentCallback} // Use the updated callback function
          close={toggleModal}
          disabled={false}
          embed={false}
          reference={generateReference()}
          email="loyablaise@gmail.com"
          amount={calculateTotal() * 100} // Convert amount to kobo
          paystackkey="pk_test_886f694d6b396a1d048e40b05d194eb6a3d6a12d"
          tag="button"
        />
      </Modal>
    </header>
  );

  //function to calculate the total price of items in the cart
  function calculateTotal() {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}

export default Header;
