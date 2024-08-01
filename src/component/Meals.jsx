import React from "react";
import MealItem from "./MealItem";
import Error from "./Error";
import useHttp from "../util/usehttp";

const requestHandle = {};
const Meals = () => {
  const { data, error, isLoading } = useHttp(
    "http://localhost:3000/meals",
    requestHandle,
    []
  );
  if (isLoading) {
    return <p className="center">Fetching Meal....</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <>
      <ul id="meals">
        {data.map((meal) => {
          return <MealItem key={meal.id} meal={meal} />;
        })}
      </ul>
    </>
  );
};

export default Meals;
