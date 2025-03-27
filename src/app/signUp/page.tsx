"use client";

import SingUpStepOne from "@/app/signUp/components/sign-up-step-one";
import SignUpStepTwo from "@/app/signUp/components/sign-up-step-two";

import { useState } from "react";

const SignUp = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="bg-white">
      {step === 1 && <SingUpStepOne setStep={setStep} />}
      {step === 2 && <SignUpStepTwo setStep={setStep} />}
    </div>
  );
};
export default SignUp;
