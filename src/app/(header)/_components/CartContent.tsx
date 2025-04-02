import { useUser } from "@/providers/UserProvider";
import { useState, useEffect } from "react";
import {
  getCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/app/utils/cart";
import { createFoodOrderItem } from "../_utils/axios";
import { createFoodOrder } from "../_utils/axios";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import HelmetIcon from "../_ui/HelmetIcon";

type CartItem = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  quantity: number;
  ingredients?: string[];
};

type Cart = {
  items: CartItem[];
  totalPrice: number;
};

const CartContent = () => {
  const [cart, setCart] = useState<Cart>({ items: [], totalPrice: 0 });
  const { userId } = useUser();

  useEffect(() => {
    const cartData = getCart();
    setCart(cartData);
  }, []);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      if (window.confirm("Remove this item from cart?")) {
        const updatedCart = removeFromCart(itemId);
        setCart(updatedCart);
      }
    } else {
      const updatedCart = updateCartItemQuantity(itemId, newQuantity);
      setCart(updatedCart);
    }
  };

  console.log;

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      return toast.warn(
        "🛒 Whoops! Your cart is feeling lonely… feed it some goodies! 🍕✨",
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
    try {
      const orderItemIds = await Promise.all(
        cart.items.map(async (item) => {
          const createdItem = await createFoodOrderItem(
            item._id,
            item.quantity
          );
          return createdItem._id;
        })
      );

      const orderResponse = await createFoodOrder(
        userId,
        cart.totalPrice,
        orderItemIds
      );

      localStorage.removeItem("cart");
      setCart({ items: [], totalPrice: 0 });

      toast.success(
        "🎉 Woohoo! Your order is on its way! 🚀🍔 Get ready for some deliciousness! 😋",
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
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-4 cursor-default">
      <div className=" bg-white w-full h-auto rounded-xl p-3">
        {cart.items.length === 0 ? (
          <div className="text-center py-10 bg-[#F4F4F5] px-2 flex items-center flex-col gap-4 rounded-xl">
            <HelmetIcon />
            <h1 className="text-[16px] font-semibold">No Order Yet ?</h1>
            <p className="text-[12px] text-[#71717A]">
              🍕 You haven't placed any orders yet. Start exploring our menu and
              satisfy your cravings!
            </p>
          </div>
        ) : (
          <div className="mb-6">
            {cart.items.map((item) => (
              <div key={item._id} className="flex gap-2 border-b py-4">
                <img
                  src={item.image}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div className="h-auto w-[200px] flex flex-col gap-3">
                  <div className="h-auto">
                    <p className="text-red-500 font-semibold">
                      {item.foodName}
                    </p>
                    <p className="text-[12px]">
                      {item.ingredients?.join(", ") + "."}
                    </p>
                  </div>
                  <div className="flex justify-between ">
                    <div className="flex items-center ">
                      <button
                        className="h-4 w-4 flex items-center justify-center "
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <p className="mx-1 text-[14px] font-medium">
                        {item.quantity}
                      </p>
                      <button
                        className="h-4 w-4 flex items-center justify-center"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <p className="text-[16px] font-semibold text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white w-full h-auto rounded-xl p-3 flex flex-col gap-3">
        <h1 className="font-semibold">Payment info</h1>
        <div className="border-b-2 flex flex-col gap-2  text-[#71717A]">
          <div className="flex justify-between">
            <p>Total</p>
            <p className="text-black font-semibold">
              ${cart.totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <button
          className="w-full h-auto bg-red-500 text-white rounded-full py-1"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
export default CartContent;
