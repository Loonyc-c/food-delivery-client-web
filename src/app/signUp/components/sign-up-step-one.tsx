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

  // const sendDataToDataBase = async () => {

  //     try {
  //         const response = await axios.post("http://localhost:9999/auth/sign-up", {
  //             email: inputValue
  //         })
  //         console.log("Email successfully sent to db", response.data);
  //     } catch (error) {
  //         console.log("Error on email to db from frontend", error)
  //     }
  // }

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
          src="https://s3-alpha-sig.figma.com/img/5d86/e6a2/488bb31d983ecd581caec983f3a32842?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Pk5hP9vLfvhOHaeOxwk39Q0oFK1tNMIb60VXErxGJUdRjyTKnbUBsUrmVBlFiEY2TSIhbR5ha42y05XNIVLbMH5uFZYISbW8i~Vfn6wa4CSqB-evNAtNI9t8bgkqDCyp2ts5aS6jpUk4NbHk7iHGLD7dLZtVxBwVvyRkpXjGWNgwQC9i~S3Mju1MIUDGSA3eodE0wgQbvWxBe6s7381MgE8UMm1ha45y2S4NYd-09YhH-EEiqwpWLotY8CIWUxTcmn691dq02yDRyQthbFfbBLtVQh6k0W1RCoOBhK-0kTz4pTXI8m57GE3Nt8jf1fQb1xM3sXu~-XrrUU6QwSc8xw__"
          className="rounded-3xl h-full"
        />
      </div>
    </div>
  );
};

export default SingUpStepOne;
