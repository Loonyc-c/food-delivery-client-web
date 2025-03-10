'use client'

import { useState, useEffect } from "react";
import { catchCategories, catchFoods } from "@/app/utils/axios";
import FoodCard from "./food-card";
type Categories = {
    category: string
    _id:string
}

const MainPageCategories = () => {
    const [categories, setCategories] = useState<Categories[]>([])



    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await catchCategories();
                setCategories(response)
            } catch (error) {
                console.error("Error getting categories:", error);
            }
        };
        getCategories()
    }, []);


    return (
        <div className="w-full h-auto">
            <div>
            {
                    categories.map((item,id) => (
                        <div key={id} className="" >
                          <div>{item.category}</div> 
                          <FoodCard category={item._id} /> 
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default MainPageCategories