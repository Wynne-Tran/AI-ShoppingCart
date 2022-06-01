import { useState, useEffect } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';

// const menuItems = [
//   {name: "Angus Burger", price: 8.99, category: 'burger'},
//   {name: "Tuna Steak Burger", price: 15.00, category: 'burger'},
//   {name: "Bacon Burger", price: 11.50, category: 'burger'},
//   {name: "Southwest Chicken Burger", price: 9.99, category: 'burger'},
//   {name: "Mozzarella Burger", price: 12.50, category: 'burger'},
//   {name: "Cesar Salad", price: 6.50, category: 'salad'},
//   {name: "BBQ Chicken Salad", price: 13.99, category: 'salad'},
//   {name: "Garden Salad", price: 9.99, category: 'salad'},
//   {name: "Veggie Lasagna", price: 17.99, category: 'pasta'},
//   {name: "Spaghetti & Meatballs", price: 17.99, category: 'pasta'},
//   {name: "Fettuccine Alfredo", price: 17.99, category: 'pasta'},
// ];



function App(){
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    alanBtn({
        key: '809c2acfdb139b34de69c18e47e178e52e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: (commandData) => {
          if (commandData.command === 'getMenu') {
            setProducts(commandData.data)
          }
          else if (commandData.command === "addToCart") {
            setCart((currentCart) => [...currentCart, commandData.data])
           }
        }
    });
  }, []);
  
  return (
    <div className="App">
      {products.map((product) => (
        <div key={product.name}>
          {product.name} - {product.price} - {product.category}
        </div>
      ))}
      <h1>Cart: </h1>
      {cart.map((cartItem) => (
        <div key={cartItem.name}>
          {cartItem.name} - {cartItem.price} - {cartItem.category}
        </div>
      ))}
    </div>
  )
}


export default App;
