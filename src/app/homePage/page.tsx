"use client";

import { CategoriesProvider } from "@/providers/CategoriesProvider";
import Categories from "./(categories)/_features/categories";
import FoodMenu from "./(foodMenu)/_features/FoodMenu";
import { FoodProvider } from "@/providers/FoodProvider";
import { useState } from "react";

const HomePage = () => {
  return (
    <FoodProvider>
      <div className="w-screen h-auto flex flex-col items-center cursor-default">
        <img
          src="/mainImage.png"
          alt="Main Image"
          className="w-full h-[600px] object-cover"
        />
        <div className="max-w-screen-xl w-full h-auto mt-14 flex flex-col gap-10">
          <Categories />
          <FoodMenu />
        </div>
      </div>
    </FoodProvider>
  );
};

export default HomePage;
