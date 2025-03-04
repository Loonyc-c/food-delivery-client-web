"use client"


import InfiniteTextSlider from './motion';
import NomNomIcon from './icons/nomnom-icon';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { div } from 'framer-motion/client';
import SocialIcon from './icons/social-icon';

type Categories = {
    category: string
}

const Footer = () => {

    const [categories, setCategories] = useState<Categories[]>([])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get("http://localhost:9999/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error getting categories:", error);
            }
        };

        getCategories();
    }, []);

    console.log(categories)

    return (

        <div className='bg-[#18181B] py-[50px] mt-[100px] flex flex-col gap-[50px] justify-center'>
            <div>
                <InfiniteTextSlider />
            </div>
            <div className='max-w-screen-xl flex justify-center'>
                <div className='flex justify-around '>
                    <NomNomIcon />
                    <div className='flex gap-[300px]'>
                        <div className='text-[#FAFAFA] flex flex-col gap-[10px]'>
                            <h1 className='text-[#71717A]'>NOMNOM</h1>
                            <p> Home</p>
                            <p> Contact us</p>
                            <p> Delivery zone</p>
                        </div>
                        <div className='flex flex-col gap-[10px]'>
                            <h1 className='text-[#71717A]'>Menu</h1>
                            <div className='grid grid-cols-2 gap-[10px]'>
                                {categories.map((item, index) => (
                                    <p key={index} className='text-white text-[14px]'>{item.category}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-[#71717A]'>Follow us</h1>
                        <div>
                            <SocialIcon />
                        </div>
                    </div>
                </div>
            </div>


            <div className=' max-w-screen-xl h-auto flex items-center justify-center'>
                <div className='border-t-2 flex text-[#71717A] gap-7'>
                    <p>Copy right 2024 © Nomnom LLC</p>
                    <p>Privacy policy</p>
                    <p>Terms and conditoin</p>
                    <p>Cookie policy</p>
                </div>
            </div>

        </div>

    )
}
export default Footer