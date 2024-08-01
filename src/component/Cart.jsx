import React, { useContext } from "react";
import Modal from "../Ui/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatted } from "../util/formatting";
import Button from "./Button";
import UserContext from "../store/UserContext";
import CartItem from "./cartItem";

const Cart = () => {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progess, hideCart, showCheckOut } = useContext(UserContext);

  const totalPrice = items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  function handleClose() {
    hideCart();
  }

  function handleOpen() {
    showCheckOut();
  }

  return (
    <Modal
      className="cart"
      open={progess === "cart"}
      onClose={progess === "cart" ? handleClose : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            add={() => addItem(item)}
            remove={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatted.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button testOnly onClick={handleClose}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleOpen}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
