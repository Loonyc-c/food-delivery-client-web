import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:9999/categories");
    return response.data;
  } catch (error) {
    console.error("Error catching categories:", error);
  }
};

export const fetchFoods = async () => {
  try {
    const response = await axios.get("http://localhost:9999/food");
    return response.data;
  } catch (error) {}
};

export const fetchFoodByCategory = async (selectedCategory: string) => {
  try {
    const response = await axios.get(
      `http://localhost:9999/food/getFoodByCategory/${selectedCategory}`
    );
    return response.data;
  } catch (error) {
    console.log("error in fetch food by category", error);
  }
};

export const addAddress = async (id: string, address: string) => {
  try {
    const response = await axios.put(`http://localhost:9999/user/${id}`, {
      address,
    });
    return response.data;
  } catch (error) {
    console.log("error adding address", error);
  }
};
