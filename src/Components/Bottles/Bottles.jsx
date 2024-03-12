import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import {addToLS, getStoredCart, removeFromLs } from "../Utilitis/localstroage";
import Cart from "../Cart/Cart";

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("bottles.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);
  // Load cart from local storage
  useEffect(() => {
    console.log("called the useEffect", bottles.length);
    if (bottles.length) {
      const storedCart = getStoredCart();
      console.log(storedCart,bottles);
      const saveCart =[];
      for(const id of storedCart){
        console.log(id)
        const bottle =bottles.find(bottle=>bottle.id ===id)
        if(bottle){
          saveCart.push(bottle)
        }
      }
      console.log(saveCart)
        setCart(saveCart)
    }
  }, [bottles]);

  const handleAddToBottle = (bottle) => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLS(bottle.id)
  };
  const handleRemoveFromCart=id=>{
    // visual cart remove
    const remainingCart=cart.filter(bottle=>bottle.id !==id)
    setCart(remainingCart)
    // remove from LS
    removeFromLs(id);
  }
  return (
    <div>
      <h3>Bottles Available:{bottles.length}</h3>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToBottle={handleAddToBottle}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
