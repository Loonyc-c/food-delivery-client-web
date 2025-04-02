import CartIcon from "@/app/(header)/_ui/CartIcon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartIconDetail from "../_ui/cartIconDetail";
import { useState } from "react";
import CartController from "./CartController";
import CartContent from "./CartContent";
import OrderContent from "./OrderContent";

const Cart = () => {
  const [step, setStep] = useState("cart");

  return (
    <div className="cursor-default">
      <Sheet>
        <SheetTrigger>
          <div className="bg-white w-8 h-8 rounded-full flex justify-center items-center">
            <CartIcon />
          </div>
        </SheetTrigger>
        <SheetContent className="bg-[#404040] py-10 w-screen">
          <SheetHeader>
            <SheetTitle>
              <div className="flex text-white gap-4 cursor-default">
                <CartIconDetail /> Food order detail
              </div>
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <CartController setStep={setStep} step={step} />
          {step === "cart" && <CartContent />}
          {step === "order" && <OrderContent />}
        </SheetContent>
      </Sheet>
    </div>
  );
  8;
};

export default Cart;
