import React, { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./Button";
import CartContext from "../store/CartContext";
import UserContext from "../store/UserContext";

const Header = () => {
  const { items } = useContext(CartContext);
  const userCart = useContext(UserContext);

  const totalItems = items.reduce((totalNumberOfItem, item) => {
    return totalNumberOfItem + item.quantity;
  }, 0);

  function handleShowModal() {
    userCart.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A hotel" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button testOnly onClick={handleShowModal}>
          Cart ({totalItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
