import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

export default function MealsItems({ meal }) {
    const cartCtx = useContext(CartContext)

    function handleAddItemToCart () {
        cartCtx.addItem(meal)
    }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
          <p className="meal-item-actions">
            <Button onClick={handleAddItemToCart}>Add to cart</Button>
          </p>
        </div>
      </article>
    </li>
  );
}
