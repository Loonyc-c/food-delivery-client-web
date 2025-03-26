"use client";

import SingUpStepOne from "@/app/components/sign-up/sign-up-step-one";
import SignUpStepTwo from "@/app/components/sign-up/sign-up-step-two";

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
