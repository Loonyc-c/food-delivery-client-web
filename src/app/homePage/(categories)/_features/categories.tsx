"use client";

import { useCategories } from "@/providers/CategoriesProvider";
import { useFoods } from "@/providers/FoodProvider";
import { useState } from "react";

const Categories = () => {
  const { setSelectedCategory, selectedCategory } = useFoods();
  const { categories } = useCategories();

  return (
    <div className="w-full h-full">
      <h1 className="text-white text-3xl font-semibold mb-8">Categories</h1>
      <div className="flex justify-between w-full ">
        <button
          className="bg-white px-4 py-1 rounded-full text-[12px]"
          onClick={() => setSelectedCategory(null)}
        >
          All foods
        </button>
        {categories?.map((item) => (
          <button
            key={item._id}
            onClick={() => setSelectedCategory(item)}
            className={`px-4 py-1 rounded-full text-[12px] transition-colors duration-300 ${
              selectedCategory?._id === item._id
                ? "bg-red-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {item.category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
