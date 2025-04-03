"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ChangeEvent } from "react";
import Link from "next/link";
import { emailValidation } from "@/app/utils/validation";
import { ChevronLeft } from "lucide-react";

type SingUpStepOneProps = {
  setStep: Dispatch<SetStateAction<number>>;
};

const SingUpStepOne = ({ setStep }: SingUpStepOneProps) => {
  const [inputValue, setInputValue] = useState<string>(() => {
    return localStorage.getItem("email") || "";
  });
  const [error, setError] = useState("");

  const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  // console.log(inputValue)

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("email", inputValue);
  }, [inputValue]);

  const handleValidation = async () => {
    const validationError = emailValidation(inputValue);
    setError(validationError);

    if (!validationError) {
      setStep((prev: number) => prev + 1);
      // await sendDataToDataBase()
    }
  };

  return (
    <div className="w-screen h-screen flex px-[2%] py-[1%] gap-[3%]">
      <div className="w-[35%] h-full flex items-center pl-[5%]">
        <div className=" w-full h-[50%] flex flex-col gap-[30px]">
          <button className="border rounded-lg p-2 w-8 h-8 flex justify-center">
            <ChevronLeft className="w-4 h-4 text-black" />
          </button>
          <div>
            <h1 className="font-semibold leading-8 text-2xl text-black">
              Create your account
            </h1>
            <p className="text-[#71717A]">
              Sign up to explore your favorite dishes
            </p>
          </div>
          <div>
            <input
              placeholder="Enter your email adress"
              className="border rounded-lg p-1.5 w-full text-black"
              value={inputValue}
              onChange={getInputValue}
            />

            {error && <p className="text-red-500 text-[14px]">{error}</p>}
          </div>

          <button
            className="w-full h-9 bg-[#71717A] rounded-lg"
            onClick={handleValidation}
          >
            <p className="text-[14px] text-[#FAFAFA]">Let's go</p>
          </button>
          <div className="flex gap-[15px] justify-center">
            <p className="text-[#71717A]">Already have an account ?</p>
            <Link href={"/"}>
              <button>
                <p className="text-[#2563EB] hover:underline">Log in</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[65%] h-full">
        <img
          src="/authImage.jpeg"
          alt="Auth Image"
          className="rounded-3xl h-full"
        />
      </div>
    </div>
  );
};

export default SingUpStepOne;
