"use client";

import { fetchFoodByCategory, fetchFoods } from "@/app/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

type Food = {
  category: string | undefined;
  foodName: string | undefined;
  image: string | undefined;
  ingredients: string[] | undefined;
  price: number | undefined;
  _id: string | undefined;
};

type selectedCategoryType = {
  _id: string | null;
  category: string;
};

type FoodContextType = {
  foods: Food[] | undefined;
  selectedCategory: selectedCategoryType | null;
  setSelectedCategory: (category: selectedCategoryType | null) => void;
};
const FoodContext = createContext<FoodContextType>({
  foods: [],
  selectedCategory: null,
  setSelectedCategory: () => {},
});

export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<selectedCategoryType | null>(null);

  const [foods, setFoods] = useState([]);

  const getData = async () => {
    let response;
    if (selectedCategory?._id) {
      response = await fetchFoodByCategory(selectedCategory._id);
    } else {
      response = await fetchFoods();
    }

    console.log(response);
    setFoods(response);
  };

  useEffect(() => {
    getData();
  }, [selectedCategory]);

  // if (isLoading) return <p>...Loading foods</p>;

  //   console.log("this is food provider", foods);

  return (
    <FoodContext.Provider
      value={{
        foods: foods || [],
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {foods ? children : <div>...loading foods</div>}
    </FoodContext.Provider>
  );
};

export const useFoods = () => {
  const context = useContext(FoodContext);
  return context;
};
