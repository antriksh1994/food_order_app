// import { useEffect, useState } from "react";
import MealsItems from "./MealsItems";
import useHttp from "../hooks/useHttp";
import Error from "./UI/Error";

// this object was getting created again and again and causing infinite loop
const requestConfig = {}

export default function Meals() {
  const {
    data: loadMeals,
    loading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  // alternate of not using useHttp hook
  // const [loadMeals, setLoadMeals] = useState([]);

  // useEffect(() => {
  // async function fetchMeals() {
  //   // try block if internet unavailable
  //   try {
  //     const response = await fetch("http://localhost:3000/meals");
  //     if (!response.ok) {
  //       console.log("==not ok");
  //     }
  //     const meals = await response.json();
  //     setLoadMeals(meals);
  //   } catch {
  //     console.log("==catch");
  //   }
  // }
  // fetchMeals();
  // }, []);

  if(loading) {
    return <p className="center">Fetching results...</p>
  }
  if (error) {
    return <Error title="Failed to fetch meals" message={error}></Error>
  }

  return (
    <ul id="meals">
      {loadMeals.map((meal) => {
        return <MealsItems key={meal.id} meal={meal}></MealsItems>;
      })}
    </ul>
  );
}
