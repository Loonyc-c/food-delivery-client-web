"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { fetchCategories } from "@/app/utils/axios";
import Loading from "@/components/loading";

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
    queryFn: fetchCategories,
  });

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {categories && !isLoading ? children : <Loading />}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  return context;
};
