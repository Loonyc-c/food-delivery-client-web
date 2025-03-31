import { useState } from "react";

type FoodItemType = {
  image?: string;
  foodName?: string;
  price?: number;
  ingredients?: string[];
};

type FoodItemPropsType = {
  foodItem: FoodItemType;
};

const OrderDishContent = ({ foodItem }: FoodItemPropsType) => {
  const [orderCount, setOrderCount] = useState(1);

  const handleOrderButton = () => {};
  return (
    <div className="flex gap-6">
      <div className="h-full w-[48%]">
        <img
          src={foodItem?.image}
          className="w-full h-full object-cover rounded-lg"
          alt={foodItem?.foodName}
        />
      </div>
      <div className="w-[62%] h-full flex flex-col justify-between">
        <div>
          <h1 className="text-[30px] text-red-500">{foodItem?.foodName}</h1>
          <p> {foodItem?.ingredients?.join(", ") + "."}</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="w-full h-14 flex">
            <div className="w-full h-full">
              <p>Total Price</p>
              <p className="text-[24px] font-bold">${foodItem?.price}</p>
            </div>
            <div className="w-[40%] h-full flex gap-4 items-center">
              <button className="h-[44px] w-[44px] rounded-full border text-black">
                <p>-</p>
              </button>
              <h1 className="text-[18px] font-semibold">{orderCount}</h1>
              <button
                className="h-[44px] w-[44px] rounded-full border border-black text-black"
                onClick={handleOrderButton}
              >
                <p>+</p>
              </button>
            </div>
          </div>
          <button className="w-full py-3 px-7 bg-black text-white rounded-full">
            {" "}
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDishContent;
