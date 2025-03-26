"use client";

import { useState, useEffect } from "react";
import { catchCategories } from "../utils/axios";
type Categories = {
  category: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await catchCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error getting categories:", error);
      }
    };
    getCategories();
  }, []);

  return (
    <div className="w-full h-full">
      <h1 className="text-white text-3xl font-semibold mb-8">Categories</h1>
      <div className="flex justify-between w-full ">
        {categories.map((item, i) => (
          <div key={i} className="bg-white px-4 py-1 rounded-full ">
            {item.category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
