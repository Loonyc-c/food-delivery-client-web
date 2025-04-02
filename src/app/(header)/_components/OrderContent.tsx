import { useEffect, useState } from "react";
import { getUserOrders } from "../_utils/axios";
import { useUser } from "@/providers/UserProvider";

const OrderContent = () => {
  const { userId } = useUser();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await getUserOrders(userId);
        setOrder(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="w-full h-full rounded-xl bg-white mt-4 p-3">
      <h1 className="text-[20px] font-semibold">Order history</h1>
      {order.map((item) => (
        <div key={item._id} className="py-2 border-b-2">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">${item.totalPrice}</h1>
            <div className="text-[12px] border p-2 rounded-full">
              {item.status}
            </div>
          </div>
          <div>
            {item.foodOrderItems.map((orderItem) => (
              <div key={orderItem._id} className="flex justify-between py-1">
                <span>{orderItem.food}</span>
                <span>x{orderItem.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderContent;
