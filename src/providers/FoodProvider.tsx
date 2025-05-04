"use client";

import { fetchFoodByCategory, fetchFoods } from "@/app/utils/axios";
import Loading from "@/components/loading";
import { createContext, useContext, useEffect, useState } from "react";

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
  isLoading: boolean;
};

const FoodContext = createContext<FoodContextType>({
  foods: [],
  selectedCategory: null,
  setSelectedCategory: () => {},
  isLoading: false,
});

export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<selectedCategoryType | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      let response;
      if (selectedCategory?._id) {
        response = await fetchFoodByCategory(selectedCategory._id);
      } else {
        setIsLoading(true);
        response = await fetchFoods();
      }
      setFoods(response);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedCategory]);

  return (
    <FoodContext.Provider
      value={{
        foods,
        selectedCategory,
        setSelectedCategory,
        isLoading,
      }}
    >
      {isLoading ? <Loading /> : children}
    </FoodContext.Provider>
  );
};

export const useFoods = () => {
  const context = useContext(FoodContext);
  return context;
};
