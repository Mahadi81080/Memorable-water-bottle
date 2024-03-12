const getStoredCart = ()=>{
    const storedCartString = localStorage.getItem('cart');
    if(storedCartString){
        return JSON.parse(storedCartString);
    }
    return [];
}
const saveCartToLS =(cart)=>{
    const cartStringfied =JSON.stringify(cart);
    localStorage.setItem('cart',cartStringfied);
}
const addToLS = id =>{
const cart =getStoredCart();
cart.push(id);
saveCartToLS(cart);
}
const removeFromLs =id =>{
    const cart =getStoredCart();
    const remmaining =cart.filter(idx =>idx !==id)
    saveCartToLS(remmaining)
}
export {addToLS,getStoredCart,removeFromLs};