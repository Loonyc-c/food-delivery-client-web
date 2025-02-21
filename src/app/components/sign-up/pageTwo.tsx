import { ChevronLeft } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import { ChangeEvent } from "react"
import { passwordValidation } from "@/app/utils/validation"
import Link from "next/link"

const SignUpStepTwo = ({ setStep }:{ setStep: Dispatch<SetStateAction<number>> }) => {
    // const [passwordValues,setPasswordValues] = useState<Password>({})
    // const [error, setError] = useState({})
    // const getPasswordValue = ((e: ChangeEvent<HTMLInputElement>) => {
    //     setPasswordValues({...passwordValues,password:e.target.value})
    // })
    // const getConfirmPasswordValue = ((e: ChangeEvent<HTMLInputElement>) => {
    //     setPasswordValues({...passwordValues,confirm_password:e.target.value}) })

    const [passwordValue, setPasswordValue] = useState("")
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const getPasswordValue = ((e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    })

    const getConfirmPasswordValue = ((e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPasswordValue(e.target.value)
    })

    const handleValidation = () => {
        const validationError = passwordValidation(passwordValue, confirmPasswordValue)
        setError(validationError)
    }

    const returnPrevStep = () => {
        setStep((prev: number) => prev - 1)
    }
    return (
        <div className="w-screen h-screen flex px-[2%] py-[1%] gap-[3%]">
            <div className="w-[35%] h-full flex items-center pl-[5%]">
                <div className="bg-white w-full h-[50%] flex flex-col gap-[30px]">
                    <button className="border rounded-lg p-2 w-8 h-8 flex justify-center"
                        onClick={returnPrevStep}>
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="font-semibold leading-8 text-2xl">Create a strong password</h1>
                        <p className="text-[#71717A]">Create a strong password with letters, numbers.</p>
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
                            <input type="checkbox" className="w-4 h-4" onChange={() => setShowPassword((prev) => !prev)} />
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
                <img src="https://s3-alpha-sig.figma.com/img/5d86/e6a2/488bb31d983ecd581caec983f3a32842?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s9s6n0YLZqP1oUMuv~8bybu~VAB8reKfcmpZeSJXhI4uvGyrR5h9aaPUYFDAa3LbcapgbvgLdyOBBU8DLzW8XO8ANU11dbfko8dn89tKKhbpaaxS6JgzM6A8QtsiUJoI8BQ9CsJLMWx3qZMfdnHp6sPvYf5qc1vSva8lqq5NopPuE0k0xW5QCEVa1kSZlDNt5vtY1EPDB86CK~nhMqOyf3bGjQ26WCXLRi4aw~NahLUyTsarKHjWP-gbRhzngNgZ1mlWFE6J2n--QheNgWkCuRzFr2bIyxw2oMDUHyjVh8r1ac2oceYvjPUTdJueOnO3LuW0q~XMFxG20ZbxqegxcA__"
                    className="rounded-3xl h-full"
                />
            </div>

        </div>
    )

}
export default SignUpStepTwo