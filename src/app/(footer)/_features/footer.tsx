"use client";

import InfiniteTextSlider from "../_components/motion";
import NomNomIcon from "../_ui/nomnom-icon";
import SocialIcon from "../_ui/social-icon";
import { usePathname } from "next/navigation";
import { useCategories } from "@/providers/CategoriesProvider";

type Categories = {
  category: string;
};

const Footer = () => {
  const pathName = usePathname();

  const { categories } = useCategories();

  // console.log("categories in footer", categories);

  if (pathName === "/" || pathName === "/signUp") {
    return null;
  }

  return (
    <div className="bg-[#18181B] w-screen h-auto py-[50px] flex flex-col items-center gap-[50px] mt-14 cursor-default">
      <div>
        <InfiniteTextSlider />
      </div>
      <div className="w-[1280px] flex flex-col gap-16">
        <div className="flex justify-around ">
          <NomNomIcon />
          <div className="flex gap-[100px] ">
            <div className="text-[#FAFAFA] flex flex-col gap-[10px]">
              <h1 className="text-[#71717A]">NOMNOM</h1>
              <p> Home</p>
              <p> Contact us</p>
              <p> Delivery zone</p>
            </div>
            <div className="flex flex-col gap-[10px]">
              <h1 className="text-[#71717A]">Menu</h1>
              <div className="grid grid-cols-2 gap-[10px]">
                {categories?.map((item, index) => (
                  <p key={index} className="text-white text-[14px]">
                    {item.category}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-[#71717A]">Follow us</h1>
            <div>
              <SocialIcon />
            </div>
          </div>
        </div>

        <div className="w-[1280px] border-t-2 flex gap-10 text-[#71717A] cursor-default">
          <p>Copy right 2024 © Nomnom LLC</p>
          <p>Privacy policy</p>
          <p>Terms and conditoin</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
