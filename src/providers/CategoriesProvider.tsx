"use client";

import { catchCategories } from "@/app/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

type CategoriesContextType = {
  categories: CategoriesType[] | undefined;
};
type CategoriesType = {
  category: string;
  _id: string;
};

const CategoriesContext = createContext<CategoriesContextType>(
  {} as CategoriesContextType
);

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: catchCategories,
  });

  console.log(categories);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {categories && !isLoading ? children : <p>...Loading categories</p>}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  // if (!context) {
  //   console.log("hello");
  // }
  return context;
};
