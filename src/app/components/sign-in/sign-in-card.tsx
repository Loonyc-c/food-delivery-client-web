

const signInCard = () => {

    return {
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
    }

}