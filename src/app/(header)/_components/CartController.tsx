const CartController = ({
  setStep,
  step,
}: {
  setStep: (value: string) => void;
  step: string;
}) => {
  const handleOnClickCart = () => {
    setStep("cart");
  };
  const handleOnClickOrder = () => {
    setStep("order");
  };

  return (
    <div className="w-full h-11 mt-4 bg-white rounded-full p-2">
      <button
        className={`w-[50%] h-full rounded-full ${
          step === "cart" ? "bg-red-500 text-white" : "bg-white text-black"
        }`}
        onClick={handleOnClickCart}
      >
        Cart
      </button>
      <button
        className={`w-[50%] h-full rounded-full  ${
          step === "order" ? "bg-red-500 text-white" : "bg-white text-black"
        }`}
        onClick={handleOnClickOrder}
      >
        Order
      </button>
    </div>
  );
};

export default CartController;
