import FoodCard from "../_components/FoodCard";
import { useFoods } from "@/providers/FoodProvider";
import { useCategories } from "@/providers/CategoriesProvider";

type CategoriesType = {
  category: string;
};

const FoodMenu = () => {
  const { foods, selectedCategory } = useFoods();
  const { categories } = useCategories();

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-[#FFFFFF] font-semibold">
        {selectedCategory?.category}
      </h1>
      <div className="w-full h-full  flex flex-wrap gap-5">
        {foods?.map((food) => (
          <FoodCard key={food._id} foodItem={food} />
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;
