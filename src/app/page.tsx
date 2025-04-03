"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import {
  emailValidation,
  signInpasswordValidation,
} from "@/app/utils/validation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Value = {
  email?: string;
  password?: string;
};

type Error = {
  email?: string;
  password?: string;
};

export default function Home() {
  const router = useRouter();
  const [loginValue, setLoginValue] = useState<Value>({});
  const [error, setError] = useState<Error>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValue({ ...loginValue, [e.target.name]: e.target.value });
  };

  const handleValidation = async () => {
    const emailError = emailValidation(loginValue?.email || "");
    const passwordError = signInpasswordValidation(loginValue?.password || "");

    setError({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      try {
        const response = await axios.post(
          "https://food-delivery-service-b295.onrender.com/auth/sign-in",
          {
            email: loginValue.email,
            password: loginValue.password,
          }
        );

        localStorage.setItem("token", response.data.token);
        router.push("/homePage");
        toast.success("Successfully logged in !", {
          position: "top-right",
          autoClose: 5000,
        });
      } catch (error: any) {
        console.error("Error during login:", error);
        if (error.response) {
          setError({ ...error, password: "Email or password is incorrect!" });
        } else {
          setError({
            ...error,
            password: "Something went wrong. Try again later!",
          });
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen flex px-[2%] py-[1%] gap-[3%] bg-white">
      <div className="w-[35%] h-full flex items-center pl-[5%]">
        <div className="w-full h-[50%] flex flex-col gap-[30px]">
          <button className="border rounded-lg p-2 w-8 h-8 flex justify-center">
            <ChevronLeft className="w-4 h-4 text-black" />
          </button>
          <div>
            <h1 className="font-semibold leading-8 text-2xl text-black">
              Log in
            </h1>
            <p className="text-[#71717A]">
              Log in to enjoy your favorite dishes.
            </p>
          </div>
          <div>
            <div>
              <input
                name="email"
                placeholder="Enter your email address"
                className="border rounded-lg p-1.5 w-full text-black"
                onChange={handleInputChange}
              />
              {error.email && (
                <p className="text-red-500 text-sm">{error.email}</p>
              )}
            </div>
            <div className="mt-[15px]">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="border rounded-lg p-1.5 w-full text-black"
                onChange={handleInputChange}
              />
              {error.password && (
                <p className="text-red-500 text-sm">{error.password}</p>
              )}
            </div>
          </div>

          <button
            className="w-full h-9 bg-[#71717A] rounded-lg"
            onClick={handleValidation}
          >
            <p className="text-[14px] text-[#FAFAFA]">Let's go</p>
          </button>
          <div className="flex gap-[15px] justify-center">
            <p className="text-[#71717A]">Don't have an account?</p>
            <Link href={"/signUp"}>
              <button>
                <p className="text-[#2563EB] hover:underline">Sign up</p>
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
}
