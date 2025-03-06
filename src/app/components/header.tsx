import NomNomIcon from "./icons/nomnom-icon"
import Link from "next/link"

const Header = () => {
    return(
    <div className="w-screen h-auto flex bg-[#18181B] py-[1%] justify-between px-[5%]"> 
        <div>
            <NomNomIcon/>
        </div>
        <div className="flex gap-3">
            <Link href={"/auth/sign-up"}> 
            <button className="px-3 py-2 bg-white rounded-full text-black text-[14px] font-medium"> Sign up </button>
            </Link>
            <Link href={"/auth/sign-in"}>
            <button className="bg-[#EF4444] px-3 py-2 rounded-full text-[14px] font-medium"> Log in </button>
            </Link>
          
        </div>
    </div>
)

}

export default Header