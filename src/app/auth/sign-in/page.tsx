'use client'

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { ChangeEvent } from "react"
import { useState } from "react"
import { emailValidation } from "@/app/utils/validation"

type Value = {
    email?:string,
    password?:string
}

type Error = {
    email?:string,
    password?:string
}

const SignIn = () => {

    const [loginValue,setLoginValue] = useState<Value>({})
    const [error,setError] = useState<Error>({})

    const getEmailValue = ((e: ChangeEvent<HTMLInputElement>) => {
        setLoginValue({...loginValue,email:e.target.value})
    })
    const getPasswordValue = ((e: ChangeEvent<HTMLInputElement>) => {
        setLoginValue({...loginValue,password:e.target.value})
    })

    const handleValidation = () => {
        const emailValue = loginValue?.email
        const emailValidationError = emailValidation(emailValue as string)
        setError({...error,email:emailValidationError})
    }

    return (
        <div className="w-screen h-screen flex px-[2%] py-[1%] gap-[3%]">
            <div className="w-[35%] h-full flex items-center pl-[5%]">
                <div className="bg-white w-full h-[50%] flex flex-col gap-[30px]">
                    <button className="border rounded-lg p-2 w-8 h-8 flex justify-center">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="font-semibold leading-8 text-2xl">Log in</h1>
                        <p className="text-[#71717A]">Log in to enjoy your favorite dishes.</p>
                    </div>
                    <div>
                        <div>
                            <input
                                placeholder="Enter your email adress"
                                className="border rounded-lg p-1.5 w-full" 
                                onChange={getEmailValue}/>
                            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                        </div>
                        <div className="mt-[15px]">
                            <input
                                placeholder="Password"
                                className="border rounded-lg p-1.5 w-full"
                                onChange={getPasswordValue}
                            />
                        </div>
                    </div>


                    <button
                        className="w-full h-9 bg-[#71717A] rounded-lg"
                        onClick={handleValidation}
                    >

                        <p className="text-[14px] text-[#FAFAFA]">Let's go</p>

                    </button>
                    <div className="flex gap-[15px] justify-center">
                        <p className="text-[#71717A]">Don't have an account ?</p>
                        <Link href={"/auth/sign-up"}>
                            <button>
                                <p className="text-[#2563EB] hover:underline">Sign up</p>
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
export default SignIn