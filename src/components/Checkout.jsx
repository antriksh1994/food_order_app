import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Inputs";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./UI/Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCxt = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const { data, loading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );
  function handleClose() {
    userProgressCxt.hideCheckout();
  }
  function handleFinish() {
    userProgressCxt.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          customer: customerData,
          items: cartCtx.items,
        },
      })
    );
  }
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (loading) {
    actions = <span>Sending order data...</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCxt.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success</h2>
        <p>Your order is submitted successfully</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCxt.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label={"Name"} type={"text"} id="name"></Input>
        <Input label={"email"} type={"text"} id="email"></Input>
        <Input label={"street"} type={"text"} id="street"></Input>
        <div className="control-row">
          <Input label={"postal code"} type={"text"} id="postal-code"></Input>
          <Input label={"city"} type={"text"} id="city"></Input>
        </div>
        {error && (
          <Error title={"failed to submit order"} message={error}></Error>
        )}
        <p className="modal-actions">
          {/* to prevent the submit of call type button is used */}
          {actions}
        </p>
      </form>
    </Modal>
  );
}
