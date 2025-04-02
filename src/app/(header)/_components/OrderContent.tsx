import { useEffect, useState } from "react";
import { getUserOrders } from "../_utils/axios";
import { useUser } from "@/providers/UserProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FoodIcon from "../_ui/FoodIcon";
import ClockIcon from "../_ui/ClockIcon";
import AddressIcon from "../_ui/AddressIcon";

type OrderType = {
  _id: string;
  status: string;
  totalPrice: number;
  foodOrderItems: FoodOrderItemType[];
  createdAt: string;
  user: UserType;
};

type UserType = {
  address: string;
};

type FoodOrderItemType = {
  food: FoodType;
  _id: string;
  quantity: number;
};

type FoodType = {
  foodName: string;
};

const OrderContent = () => {
  const { userId } = useUser();
  const [order, setOrder] = useState<OrderType[]>([]);
  console.log(userId);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await getUserOrders(userId);
        setOrder(response?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [userId]);

  console.log(order);

  return (
    <div className="w-full h-full overflow-scroll rounded-xl bg-white mt-4 p-3 cursor-default">
      <h1 className="text-[20px] font-semibold">Order history</h1>
      {order && order.length > 0 ? (
        order.map((item) => {
          const formattedDate = item.createdAt.split("T")[0];
          return (
            <div key={item._id} className="py-2 border-b-2">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">${item.totalPrice}</h1>
                <div className="text-[12px] flex items-center justify-center border p-2 rounded-full">
                  {item.status}
                </div>
              </div>
              <div>
                {item.foodOrderItems &&
                  item.foodOrderItems.map((orderItem) => {
                    let foodName = "Unknown food";
                    if (orderItem.food) {
                      if (typeof orderItem.food === "string") {
                        foodName = orderItem.food;
                      } else if (
                        typeof orderItem.food === "object" &&
                        orderItem.food.foodName
                      ) {
                        foodName = orderItem.food.foodName;
                      }
                    }

                    return (
                      <div
                        key={orderItem._id || Math.random()}
                        className="flex justify-between py-1"
                      >
                        <div className="flex gap-2 items-center">
                          <FoodIcon />
                          <span className="text-[12px] text-[#71717A]">
                            {foodName}
                          </span>
                        </div>
                        <span className="text-[12px] font-semibold">
                          x{orderItem.quantity}
                        </span>
                      </div>
                    );
                  })}
              </div>
              <div className="p-[2px] flex flex-col gap-2 ">
                <div className="flex gap-2 items-center">
                  <ClockIcon />
                  <p className="text-[12px] text-[#71717A]">{formattedDate}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <AddressIcon />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="max-w-[250px] overflow-hidden cursor-pointer text-ellipsis whitespace-nowrap text-[12px] text-[#71717A]">
                          {item.user.address}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.user.address}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No orders found</div>
      )}
    </div>
  );
};

export default OrderContent;
