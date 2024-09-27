import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
    const cartCtx = useContext(CartContext)
    const userProgressCxt = useContext(UserProgressContext)
    const totalCartItems = cartCtx.items.reduce((totalItems, item) => {
        return totalItems + item.quantity
    }, 0);

    function handleShowCart () {
      userProgressCxt.showCart()
    }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="restaurant" />
        <h1>React food</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={handleShowCart}>Cart({totalCartItems})</Button>
      </nav>
    </header>
  );
}
