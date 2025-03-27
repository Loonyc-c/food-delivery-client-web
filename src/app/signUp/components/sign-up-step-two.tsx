import { ChevronLeft } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import { ChangeEvent } from "react"
import { passwordValidation } from "@/app/utils/validation"
import Link from "next/link"
import axios from "axios"

type SignUpStepTwoProps = {
    setStep: Dispatch<SetStateAction<number>>,
}


const SignUpStepTwo = ({ setStep }: SignUpStepTwoProps) => {
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

    const email = localStorage.getItem("email") || ""
    console.log(email)
    // console.log("aaaa")
    console.log(passwordValue)

    const getPasswordValue = ((e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    })

    const getConfirmPasswordValue = ((e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPasswordValue(e.target.value)
    })

    const handleValidation = async () => {
        const validationError = passwordValidation(passwordValue, confirmPasswordValue)

        if (validationError) {
            setError(validationError)
            return
        }

        if (passwordValue !== confirmPasswordValue) {
            setError("Password doesn't match")
            return
        }
        try {
            const response = await axios.post("http://localhost:9999/auth/sign-up", {
                email: email,
                password: passwordValue
            });
            console.log("Password successfully sent to DB:", response.data);
        } catch (error) {
            console.error(`Error posting password to DB:`, error);
        }
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
                        <ChevronLeft className="w-4 h-4 text-black" />
                    </button>
                    <div>
                        <h1 className="font-semibold leading-8 text-2xl text-black">Create a strong password</h1>
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
                <img src="https://s3-alpha-sig.figma.com/img/5d86/e6a2/488bb31d983ecd581caec983f3a32842?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Pk5hP9vLfvhOHaeOxwk39Q0oFK1tNMIb60VXErxGJUdRjyTKnbUBsUrmVBlFiEY2TSIhbR5ha42y05XNIVLbMH5uFZYISbW8i~Vfn6wa4CSqB-evNAtNI9t8bgkqDCyp2ts5aS6jpUk4NbHk7iHGLD7dLZtVxBwVvyRkpXjGWNgwQC9i~S3Mju1MIUDGSA3eodE0wgQbvWxBe6s7381MgE8UMm1ha45y2S4NYd-09YhH-EEiqwpWLotY8CIWUxTcmn691dq02yDRyQthbFfbBLtVQh6k0W1RCoOBhK-0kTz4pTXI8m57GE3Nt8jf1fQb1xM3sXu~-XrrUU6QwSc8xw__"
                    className="rounded-3xl h-full"
                />
            </div>

        </div>
    )

}
export default SignUpStepTwo