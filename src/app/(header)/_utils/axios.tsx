import axios from "axios";

export const createFoodOrderItem = async (food: string, quantity: number) => {
  try {
    const response = await axios.post("http://localhost:9999/orderItem", {
      food,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error in create food order item:", error);
    throw error;
  }
};

export const createFoodOrder = async (
  user: string | undefined,
  totalPrice: number,
  foodOrderItems: { food: any; quantity: any }[]
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
    throw error;
  }
};

export const getUserOrders = async (userId: string | undefined) => {
  try {
    const response = axios.get(`http://localhost:9999/order/${userId}`);
    return response;
  } catch (error) {
    console.log("error in getting user food order ", error);
    throw error;
  }
};

export const getFoodById = (foodId: string) => {
  try {
    const response = axios.get(`http://localhost:9999/order/${foodId}`);
    return response;
  } catch (error) {
    console.log("error in getting user food order ", error);
    throw error;
  }
};
