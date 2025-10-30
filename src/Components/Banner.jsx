import React from 'react';
import banner from "../assets/Images/Banner.jpg"

const Banner = () => {
    return (
        <div className=''>
            <div className='flex justify-between items-center p-10'>
                <div>
                    <h2 className='text-7xl'>বন্ধু <span className='text-yellow-500'>চল</span></h2>
                    <p className='text-2xl mt-10'>বন্ধু চল যাই দুনিয়া দেখি💕</p>
                </div>
                <img src={banner} className='max-w-[450px]' />
            </div>
        </div>
    );
};

export default Banner;