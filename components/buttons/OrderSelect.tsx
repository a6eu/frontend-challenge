import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const OrderSelect = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleChange = (event: { target: { value: any; }; }) => {
        const value = event.target.value;

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('select', value);

        const newUrl = `${pathname}?${newSearchParams.toString()}`;
        router.push(newUrl);
    };

    return (
        <div className="flex items-center justify-end">
            <select
                className="text-black text-[20px] font-light px-2 appearance-none"
                name="order"
                id="order"
                defaultValue={searchParams.get('ordering') || ''}
                onChange={handleChange}
            >
                <option value="">order</option>
                <option value="price">by price</option>
                <option value="-price">by rating</option>
            </select>
            <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2658_778)">
                    <path
                        d="M6.97993 1.5V20.1875M6.97993 20.1875L12.7577 14.4375M6.97993 20.1875L1.20215 14.4375M1.20215 24.5H27.2021M21.4244 20.1875V1.5M21.4244 1.5L15.6466 7.25M21.4244 1.5L27.2021 7.25"
                        stroke="black" strokeLinecap="round" />
                </g>
                <defs>
                    <clipPath id="clip0_2658_778">
                        <rect width="28.0339" height="25" fill="white" transform="translate(0.185059 0.5)" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export default OrderSelect;