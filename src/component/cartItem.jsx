import React from "react";

const CartItem = ({ name, quantity, price, add, remove }) => {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} * {price}
      </p>
      <p className="cart-item-actions">
        <button onClick={remove}>-</button>
        <span>{quantity}</span>
        <button onClick={add}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
