"use client";

import NomNomIcon from "../../(footer)/_ui/nomnom-icon";
import Address from "../_components/Address";
import Cart from "../_components/Cart";
import Profile from "../_components/Profile";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();

  if (pathName === "/" || pathName === "/signUp") {
    return null;
  }

  return (
    <div className="w-screen h-auto flex bg-[#18181B] py-[1%] justify-between px-[5%]">
      <div>
        <NomNomIcon />
      </div>
      <div className="flex gap-3 items-center">
        <Address />
        <Cart />
        <Profile />
      </div>
    </div>
  );
};

export default Header;
