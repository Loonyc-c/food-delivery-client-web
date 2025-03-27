"use client";

import { catchFoods } from "@/app/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

type Food = {
  category: string | undefined;
  foodName: string | undefined;
  image: string | undefined;
  ingredients: string[] | undefined;
  price: number | undefined;
  _id: string | undefined;
};

type FoodContextType = {
  foods: Food[] | undefined;
};
const FoodContext = createContext<FoodContextType>({} as FoodContextType);

export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: foods, isLoading } = useQuery({
    queryKey: ["foods"],
    queryFn: catchFoods,
  });

  if (isLoading) return <p>...Loading foods</p>;

  //   console.log("this is food provider", foods);

  return (
    <FoodContext.Provider
      value={{
        foods,
      }}
    >
      {foods ? children : <div>...loading</div>}
    </FoodContext.Provider>
  );
};

export const useFoods = () => {
  const context = useContext(FoodContext);
  return context;
};
