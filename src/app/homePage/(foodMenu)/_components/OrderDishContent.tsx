import { useState } from "react";
import { addToCart } from "@/app/utils/cart";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";

type FoodItemType = {
  image?: string;
  foodName?: string;
  price?: number;
  ingredients?: string[];
  _id?: string;
};

type FoodItemPropsType = {
  foodItem: FoodItemType;
  closeDialog: () => void;
};

const OrderDishContent = ({ foodItem, closeDialog }: FoodItemPropsType) => {
  const userAddress = localStorage.getItem("address");
  const [orderCount, setOrderCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(foodItem?.price || 0);

  const handleOrderButton = () => {
    const newCount = orderCount + 1;
    setOrderCount(newCount);
    setTotalPrice(newCount * (foodItem?.price || 0));
  };

  const handleDecreaseButton = () => {
    if (orderCount > 1) {
      const newCount = orderCount - 1;
      setOrderCount(newCount);
      setTotalPrice(newCount * (foodItem?.price || 0));
    }
  };

  const handleAddCartButton = () => {
    if (!userAddress) {
      return toast.warn(
        "📍 Whoa there! You forgot to add your address. How will we find you? 🏠",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    }

    if (foodItem && foodItem._id) {
      const cartItem = {
        _id: foodItem._id,
        foodName: foodItem.foodName || "",
        price: foodItem.price || 0,
        image: foodItem.image || "",
        quantity: orderCount,
        ingredients: foodItem.ingredients,
      };

      addToCart(cartItem);

      toast.success(
        `🍕 ${foodItem.foodName} is now in your cart! Get ready for a delicious time! 🎉`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
      closeDialog();
    }
  };
  return (
    <div className="flex gap-6 cursor-default">
      <div className="h-auto w-[48%] flex items-center justify-center">
        <img
          src={foodItem?.image}
          className="w-full max-h-[350px] object-contain rounded-lg"
          alt={foodItem?.foodName}
        />
      </div>

      <div className="w-[62%] h-full flex flex-col justify-between">
        <div>
          <h1 className="text-[30px] text-red-500">{foodItem?.foodName}</h1>
          <p>{foodItem?.ingredients?.join(", ") + "."}</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="w-full h-14 flex">
            <div className="w-full h-full">
              <p>Total Price</p>
              <p className="text-[24px] font-bold">${totalPrice}</p>
            </div>
            <div className="w-[40%] h-full flex gap-4 items-center">
              <button
                className="h-[44px] w-[44px] rounded-full border text-black"
                onClick={handleDecreaseButton}
              >
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
          <button
            className="w-full py-3 px-7 bg-black text-white rounded-full"
            onClick={handleAddCartButton}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDishContent;
