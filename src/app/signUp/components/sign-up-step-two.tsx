import { ChevronLeft } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { ChangeEvent } from "react";
import { passwordValidation } from "@/app/utils/validation";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Bounce } from "react-toastify";

type SignUpStepTwoProps = {
  setStep: Dispatch<SetStateAction<number>>;
};

const SignUpStepTwo = ({ setStep }: SignUpStepTwoProps) => {
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const email = localStorage.getItem("email") || "";

  const getPasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const getConfirmPasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswordValue(e.target.value);
  };

  const handleValidation = async () => {
    const validationError = passwordValidation(
      passwordValue,
      confirmPasswordValue
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post(
        "https://food-delivery-service-b295.onrender.com/auth/sign-up",
        {
          email: email,
          password: passwordValue,
        }
      );
      console.log("Password successfully sent to DB:", response.data);
    } catch (error) {
      console.error(`Error posting password to DB:`, error);
    }
    toast.success(
      "🎉 Welcome aboard! Your account is all set up. Time to explore and enjoy delicious bites! 🍔✨",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }
    );
    router.push("/");
  };

  const returnPrevStep = () => {
    setStep((prev: number) => prev - 1);
  };
  return (
    <div className="w-screen h-screen flex px-[2%] py-[1%] gap-[3%]">
      <div className="w-[35%] h-full flex items-center pl-[5%]">
        <div className="bg-white w-full h-[50%] flex flex-col gap-[30px]">
          <button
            className="border rounded-lg p-2 w-8 h-8 flex justify-center"
            onClick={returnPrevStep}
          >
            <ChevronLeft className="w-4 h-4 text-black" />
          </button>
          <div>
            <h1 className="font-semibold leading-8 text-2xl text-black">
              Create a strong password
            </h1>
            <p className="text-[#71717A]">
              Create a strong password with letters, numbers.
            </p>
          </div>
          <div>
            <div>
              <input
                placeholder="Passowrd"
                className="border rounded-lg p-1.5 w-full"
                onChange={getPasswordValue}
                type={showPassword ? "text" : "password"}
              />
              {error && <p className="text-red-500 text-[14px]">{error}</p>}
            </div>
            <div className="mt-[15px]">
              <input
                placeholder="Confirm"
                className="border rounded-lg p-1.5 w-full"
                onChange={getConfirmPasswordValue}
                type={showPassword ? "text" : "password"}
              />
              {error && <p className="text-red-500 text-[14px]">{error}</p>}
            </div>
            <div className="flex gap-2 mt-[15px] items-center">
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={() => setShowPassword((prev) => !prev)}
              />
              <p className="text-[#71717A] text-[14px]">Show password</p>
            </div>
          </div>

          <button
            className="w-full h-9 bg-[#71717A] rounded-lg"
            onClick={handleValidation}
          >
            <p className="text-[14px] text-[#FAFAFA]">Let's go</p>
          </button>
          <div className="flex gap-[15px] justify-center">
            <p className="text-[#71717A]">Already have an account ?</p>
            <Link href={"/auth/sign-in"}>
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
export default SignUpStepTwo;
