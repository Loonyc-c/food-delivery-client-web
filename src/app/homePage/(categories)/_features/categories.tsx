"use client";

import { useCategories } from "@/providers/CategoriesProvider";
import { useFoods } from "@/providers/FoodProvider";
// type Categories = {
//   category: string;
// };

const Categories = () => {
  const { foods, selectedCategory, setSelectedCategory } = useFoods();
  const { categories } = useCategories();

  // console.log(selectedCategory);

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
            className="bg-white px-4 py-1 rounded-full text-[12px]"
          >
            {item.category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
