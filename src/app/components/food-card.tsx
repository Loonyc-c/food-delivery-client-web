"use client";

import { useEffect, useState } from "react";
import { catchFoods } from "../utils/axios";

type Food = {
  foodName: string;
  category: string;
  image: string;
  price: number;
};
type FoodCardProps = {
  category: string;
};

const FoodCard = ({ category }: FoodCardProps) => {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await catchFoods();
        setFoods(response);
      } catch (error) {
        console.error("Error getting categories:", error);
      }
    };
    getFoods();
  }, []);

  const filteredFoods = foods.filter((food) => food.category === category);

  return (
    <div className="flex flex-wrap justify-between ">
      {filteredFoods.length > 0 ? (
        filteredFoods.map((item, i) => (
          <div
            key={i}
            className="bg-white mt-[20px] p-4 w-[400px] h-[350px] rounded-md shadow-md hover:shadow-lg transition"
          >
            <img
              src={`xdata:image/png;base64,${item.image}`}
              alt={item.foodName}
              className="w-full h-48 object-cover rounded-md"
            />
            <div>
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-[24px] text-[#EF4444]">
                  {item.foodName}
                </h3>
                <p className="font-semibold"> ${item.price}</p>
              </div>
              <div className="flex">
                {item.ingredients.map((ingredient, i) => (
                  <p key={i}>{ingredient}, </p>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No foods available for this category.</p>
      )}
    </div>
  );
};

export default FoodCard;
