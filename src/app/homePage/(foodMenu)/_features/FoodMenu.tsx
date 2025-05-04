import FoodCard from "../_components/FoodCard";
import { useFoods } from "@/providers/FoodProvider";
import { useCategories } from "@/providers/CategoriesProvider";

type CategoriesType = {
  category: string;
};

const FoodMenu = () => {
  const { foods, selectedCategory } = useFoods();

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-[#FFFFFF] font-semibold">
        {selectedCategory?.category}
      </h1>
      <div className="flex flex-wrap w-full h-full gap-10">
        {foods?.map((food) => (
          <FoodCard key={food._id} foodItem={food} />
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;
