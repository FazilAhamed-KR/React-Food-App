import React, { useContext } from "react";
import { currencyFormatted } from "../util/formatting";
import Button from "./Button";
import CartContext from "../store/CartContext";

const MealItem = ({ meal }) => {
  const cartContext = useContext(CartContext);

  const handleAdd = () => {
    cartContext.addItem(meal);
  };
   const link = "http://localhost:3000/";
  return (
    <>
      <li className="meal-item">
        <article>
          <img src={link + meal.image} alt={meal.name} />
          <div>
            <h3>{meal.name}</h3>
            <p className="meal-item-price">
              {currencyFormatted.format(meal.price)}
            </p>
            <p className="meal-item-description">{meal.description}</p>
          </div>
          <p className="meal-item-actions">
            <Button onClick={handleAdd}>Add to cart</Button>
          </p>
        </article>
      </li>
    </>
  );
};

export default MealItem;
