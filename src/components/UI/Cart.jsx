import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../../store/CartContext";
import UserProgressContext from "../../store/UserProgressContext";
import { currencyFormatter } from "../../util/formatting";
import Button from "./Button";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCxt = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  function handleCheckoutCart() {
    userProgressCxt.showCheckout()
  }
  function handleCloseCart() {
    userProgressCxt.hideCart();
  }
  return (
    <Modal className="cart" open={userProgressCxt.progress === "cart"} onClose={userProgressCxt.progress === 'cart' ? handleCloseCart: null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onDecrease={() => cartCtx.removeItem(item.id)}
            onIncrease={() => cartCtx.addItem(item)}
          ></CartItem>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (<Button onClick={handleCheckoutCart}>Go to checkout</Button>)}
      </p>
    </Modal>
  );
}
