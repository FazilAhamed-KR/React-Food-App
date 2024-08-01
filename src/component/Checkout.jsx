import React, { useContext } from "react";
import Modal from "../Ui/Modal";
import { currencyFormatted } from "../util/formatting";
import CartContext from "../store/CartContext";
import Input from "../Ui/Input";
import Button from "./Button";
import UserContext from "../store/UserContext";
import Error from "./Error";
import useHttp from "../util/usehttp";

const requestData = {
  method: "POST",
  headers: {
    "content-Type": "application/json",
  },
};

const Checkout = () => {
  const { items } = useContext(CartContext);
  const { progess, hideCheckOut } = useContext(UserContext);

  const { data, error, isLoading, sendRequest } = useHttp(
    "http://localhost:3000/orders",
    requestData,
    []
  );

  const totalPrice = items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  const handleClose = () => {
    hideCheckOut();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);

    const form = event.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          item: items,
          userData: userData,
        },
      })
    );
  };
  let action = (
    <>
      <Button type="button" testOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    action = <span disabled>Sending the request...</span>;
  }
  if (data && !error) {
    return (
      <Modal open={progess === "checkout"} onClose={handleClose}>
        <h2>Success!</h2>
        <p>Your order was submitted sucessfully.</p>
        <p>other details we will communicate in email</p>
        <p className="modal-actions">
          <Button onClick={handleClose}>Okay</Button>
        </p>
      </Modal>
    );
  }
  console.log(error);
  return (
    <Modal
      open={progess === "checkout"}
      onClose={progess === "checkout" ? handleClose : null}
    >
      <form onSubmit={handleSubmit}>
        <h2>CheckOut</h2>
        <p>Total Amount: {currencyFormatted.format(totalPrice)}</p>

        <Input id="name" label="Full-Name" type="text" />
        <Input id="email" label="Email" type="email" />
        <Input id="street" type="text" label="Street" />
        <div className="control-row">
          <Input id="postalCode" type="text" label="Postal Code" />
          <Input id="city" type="text" label="City" />
        </div>
        {error && <Error title="error" message={error} />}
        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
