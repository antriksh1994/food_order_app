import { useEffect, useState } from "react";
import MealsItems from "./MealsItems";

export default function Meals() {
  const [loadMeals, setLoadMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      // try block if internet unavailable
      try {
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) {
          console.log("==not ok");
        }
        const meals = await response.json();
        setLoadMeals(meals);
      } catch {
        console.log("==catch");
      }
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadMeals.map((meal) => {
        return <MealsItems key={meal.id} meal={meal}></MealsItems>;
      })}
    </ul>
  );
}
