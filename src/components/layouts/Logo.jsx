import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Logo = () => {
    return (
        <Link href={"/"} className='flex items-center gap-1'>
            <Image
             alt="Logo-hero-kidz" 
             src={"/assets/logo.png"} 
             width={50} 
             height={40}
            />
            <h2 className='text-xl font-bold'>Hero <span className='text-primary'>Kidz</span> </h2>
        </Link>
    );
};

export default Logo;