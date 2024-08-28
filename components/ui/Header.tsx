'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import enterIcon from '@/public/general icons/enter.svg';
import logo from "@/public/logo.jpeg"
import BasketCounter from '@/components/ui/BasketCounter';

const Header = () => {
    const pathname = usePathname();
    const [activePage, setActivePage] = useState<'home' | 'search' | 'favorites' | null>('search');

    useEffect(() => {
        switch (pathname) {
            case '/search' || '/category/[:id]':
                setActivePage('search');
                break;
            case '/favorites':
                setActivePage('favorites');
                break;
            case '/' :
                setActivePage('home');
                break;
            default:
                setActivePage('home');
                break;
        }
    }, [pathname]);

    return (
        <>
            <div
                className={`fixed w-full mb-6 z-50 bg-white sm:flex justify-center ${pathname === '/seller' || pathname === '/auth' && 'hidden'}`}>
                <div
                    className={`bg-white h-[74px] w-full px-[10px] max-w-[1800px] flex justify-between items-center relative`}>
                    <Link href={'/'} className={`text-black text-[32px] font-semibold`}>
                        e-shop
                    </Link>
                    <div
                        className={`hidden sm:flex items-center transition-all duration-300 hover:w-[desired-width] ease-in`}>
                        <Link
                            href={'/'}
                            onClick={() => setActivePage('home')}
                            className={`group ${activePage === 'home' ? 'bg-black scale-105' : 'hover:bg-black transition-all duration-300 ease-linear transform hover:scale-105'}  flex flex-row rounded-[10px] px-[18px] gap-[10px] items-center h-[42px]`}>
                            <svg width="24" height="27" viewBox="0 0 22 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.3911 4.36275C10.986 3.96752 10.3167 3.98277 9.9317 4.396L3.75406 11.0267C3.59044 11.2022 3.5 11.4295 3.5 11.6649V18.966C3.5 19.4953 3.94772 19.9243 4.5 19.9243H7.5C8.05228 19.9243 8.5 19.4953 8.5 18.966V15.6118C8.5 15.0825 8.94772 14.6535 9.5 14.6535H12.5C13.0523 14.6535 13.5 15.0825 13.5 15.6118V18.966C13.5 19.4953 13.9477 19.9243 14.5 19.9243H17.5C18.0523 19.9243 18.5 19.4953 18.5 18.966V11.6913C18.5 11.4401 18.3971 11.199 18.2134 11.0198L11.3911 4.36275Z"
                                    className={`${activePage === 'home' ? 'stroke-white' : 'stroke-black group-hover:stroke-white'}`}
                                    strokeWidth="2" />
                            </svg>
                            <h1 className={`text-[20px] text-white ${activePage === 'home' ? 'block' : 'group-hover:block hidden'}`}>Home</h1>
                        </Link>

                    </div>
                    <BasketCounter />
                </div>
            </div>
        </>
);
};

export default Header;