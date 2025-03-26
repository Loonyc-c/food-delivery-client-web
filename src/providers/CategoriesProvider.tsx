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

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
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

  if (isLoading) return <p>...Loading</p>;
  console.log("categories in provider", categories);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {categories ? children : <p>...Loading categories</p>}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  return context;
};
