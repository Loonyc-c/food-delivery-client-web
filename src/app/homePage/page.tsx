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
          src="https://s3-alpha-sig.figma.com/img/8984/6312/a2a7c22f5fe9122b2bd6276cdd549c3e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SLrhwKAKoP8Z6j4puLxu0zBtQzISx1qbmVQKLmZnlveWWuEOUJAoIA1Q7O~qWgD5E0NuLv9ku55MNNO-czaV22zUDZDPHQzphyRpcOL8Ettoyh6I2NN17ksaakOjqnq~SdIIGOueT3UXksc373cBh1cXPGzDSwg-YskzgptBB3l-lVin9mgNL1WZXVo5sRWPIU~ZWAewhd2vaAQIqpb9GmIZnL972pnyuAZoJpSs6pQLivYaRMAtzXK2jUsTx598ZziI5aJYdeXFiVkM2VkkXIlnyE3lN0DqKTNiZS6WGtgwPOG-DPA8SzQSCHLCo2VK4dvAO5u9JgbM7GpxAG-M-w__"
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
