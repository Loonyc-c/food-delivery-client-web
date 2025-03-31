import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OrderDishContent from "./OrderDishContent";
import AddOrderIcon from "../_ui/AddOrderIcon";

type FoodItemType = {
  image?: string;
  foodName?: string;
  price?: number;
  ingredients?: string[];
};

type FoodItemPropsType = {
  foodItem: FoodItemType;
};

const FoodCard = ({ foodItem }: FoodItemPropsType) => {
  return (
    <div className="bg-white border mt-[20px] w-[340px] h-auto p-4 rounded-lg">
      <div className="relative">
        <img
          src={foodItem?.image}
          className="w-full h-48 object-cover rounded-lg"
          alt={foodItem?.foodName}
        />
        <div className="absolute top-[150px] right-2">
          <Dialog>
            <DialogTrigger className="bg-white p-2 rounded-full">
              <AddOrderIcon />
            </DialogTrigger>
            <DialogContent className="max-w-[800px] h-[400px]">
              <DialogHeader className="hidden">
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <OrderDishContent foodItem={foodItem} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full h-auto mt-3">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-[24px] text-[#EF4444]">
            {foodItem?.foodName}
          </h3>
          <p className="font-semibold text-black">$ {foodItem?.price}</p>
        </div>
        <div className="flex">
          <p className="text-black">
            {foodItem?.ingredients?.join(", ") + "."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
