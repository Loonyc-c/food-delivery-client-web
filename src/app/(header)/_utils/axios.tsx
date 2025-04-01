import axios from "axios";

export const createFoodOrderItem = async (
  foodName: string,
  quantity: number
) => {
  try {
    const response = await axios.post("http://localhost:9999/orderItem", {
      foodName,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.log("error in create food order item ", error);
  }
};

export const createFoodOrder = async (
  user: string | undefined,
  totalPrice: number,
  foodOrderItems: { foodName: any; quantity: any }[]
) => {
  try {
    const response = await axios.post("http://localhost:9999/order", {
      user,
      totalPrice,
      foodOrderItems,
    });
    return response.data;
  } catch (error) {
    console.log("error in create food order ", error);
  }
};

export const getUserOrders = async (userId: string | undefined) => {
  try {
    const response = axios.get(`http://localhost:9999/order/${userId}`);
    return response;
  } catch (error) {
    console.log("error in getting user food order ", error);
  }
};
