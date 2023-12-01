import React, { useState } from 'react'
import Header from './header.jsx'
import Footer from './footer.jsx'
import Shop from './shop' // Import the Shop component
// import 'react-modal/style/react-modal.css';

function App() {
  
   //state to manage the visibility of the cart section
   const [cartVisible, setCartVisible] = useState(false);

   // state to maintain items in cart 
   const[cartItems, setCartItems] = useState([ ]);

 //function to remove an item from the cart
 const removeItemFromCart = (itemId) => {
  // filter out the item with the specified itemId
  const updateCart = cartItems.filter(item => item.id !== itemId);

  // update the cart state with the modifiled cart 
  setCartItems(updateCart);  
};


    // function to update quantity of an item 
    const updateQuantity = (itemId, newQuantity) => {
      const updateCart = cartItems.map(item => 
          item.id === itemId ?{...item, quantity: newQuantity} : item
          );
          setCartItems(updateCart);
  };

   // function to toggle the cart visibility 
   const toggleCart = () => {
    setCartVisible(prevCartVisible => !prevCartVisible);
    // console.log('After toggle, cartVisible:', cartVisible);
    }

    const addToCart = (item) => {
      // Check if the item is already in the cart
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    
      if (existingItem) {
        // If the item is already in the cart, update its quantity
        const updatedCart = cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        setCartItems(updatedCart);
      } else {
        // If the item is not in the cart, add it with quantity 1
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
    };
    


 
  return(
   <>
    <Header
    cartVisible={cartVisible}
    cartItems={cartItems}
    removeItemFromCart={removeItemFromCart}
    updateQuantity={updateQuantity}
    toggleCart={toggleCart}
    />
    <Shop onAddToCart={addToCart}/>
    <Footer />
   </>
  );
}
export default App
