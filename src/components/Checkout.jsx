import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Inputs";
import Button from "./UI/Button";

export default function Checkout() {
    const cartCtx = useContext(CartContext)
    const userProgressCxt = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    function handleClose () {
        userProgressCxt.hideCheckout()
    }
    function handleSubmit (event) {
        event.preventDefault()
        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries())

        fetch('http://localhost:3000/orders', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    customer: customerData,
                    items: cartCtx.items,
                }
            })

        })
    }

    return (
        <Modal open={userProgressCxt.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label={'Name'} type={'text'} id="name"></Input>
                <Input label={'email'} type={'text'} id="email"></Input>
                <Input label={'street'} type={'text'} id="street"></Input>
                <div className="control-row">
                    <Input label={'postal code'} type={'text'} id="postal-code"></Input>
                    <Input label={'city'} type={'text'} id="city"></Input>
                </div>
                <p className="modal-actions">
                    {/* to prevent the submit of call type button is used */}
                    <Button type="button" textOnly onClick={handleClose}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    )
}