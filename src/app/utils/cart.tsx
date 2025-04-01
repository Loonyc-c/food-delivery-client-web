export type CartItem = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  quantity: number;
  ingredients?: string[];
};

export type Cart = {
  items: CartItem[];
  totalPrice: number;
};

export const getCart = (): Cart => {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    return JSON.parse(cartData);
  }
  return { items: [], totalPrice: 0 };
};

export const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const addToCart = (foodItem: CartItem): Cart => {
  const cart = getCart();
  const existingItemIndex = cart.items.findIndex(
    (item) => item._id === foodItem._id
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += foodItem.quantity;
  } else {
    cart.items.push(foodItem);
  }

  cart.totalPrice = calculateTotalPrice(cart.items);

  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
};

export const removeFromCart = (itemId: string): Cart => {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item._id !== itemId);

  cart.totalPrice = calculateTotalPrice(cart.items);

  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
};

export const updateCartItemQuantity = (
  itemId: string,
  quantity: number
): Cart => {
  const cart = getCart();

  if (quantity <= 0) {
    cart.items = cart.items.filter((item) => item._id !== itemId);
  } else {
    const itemIndex = cart.items.findIndex((item) => item._id === itemId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    }
  }

  cart.totalPrice = calculateTotalPrice(cart.items);

  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
};
