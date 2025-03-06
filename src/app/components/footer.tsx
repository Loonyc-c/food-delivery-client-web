"use client"


import InfiniteTextSlider from './motion';
import NomNomIcon from './icons/nomnom-icon';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { div } from 'framer-motion/client';
import SocialIcon from './icons/social-icon';
import { catchCategories } from '../utils/axios';

type Categories = {
    category: string
}

const Footer = () => {

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

    console.log(categories)

    return (

        <div className='bg-[#18181B] w-screen h-auto py-[50px] flex flex-col items-center gap-[50px] mt-14'>
            <div>
                <InfiniteTextSlider />
            </div>
            <div className='w-[1280px] flex flex-col gap-16'>
                <div className='flex justify-around '>
                    <NomNomIcon />
                    <div className='flex gap-[100px] '>
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


                <div className='w-[1280px] border-t-2 flex gap-10 text-[#71717A] '>
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