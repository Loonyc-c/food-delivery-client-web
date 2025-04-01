import { useEffect, useState } from "react";
import { getUserOrders } from "../_utils/axios";
import { useUser } from "@/providers/UserProvider";

const OrderContent = () => {
  const { userId } = useUser();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrders = () => {
      try {
        const response = getUserOrders(userId);
        setOrder(response);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  console.log(order);
  return (
    <div className="w-full h-full rounded-xl bg-white mt-4">
      <div>Order history</div>
    </div>
  );
};

export default OrderContent;
