'use client'

import SignUpStepTwo from "@/app/components/sign-up/pageTwo"
import SingUpStepOne from "@/app/components/sign-up/pageOne"

import { useState } from "react"

const SignUp = () => {
    const [step, setStep] = useState(1)

    return (
        <div>
            {step === 1 && <SingUpStepOne setStep={setStep} />}
            {step === 2 && <SignUpStepTwo setStep={setStep} />}
        </div>
    )
}
export default SignUp