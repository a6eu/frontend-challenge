import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IProduct } from '@/models/IProduct';

const BasketCounter = () => {
    const items = useSelector((state: { basket: { items: IProduct[] } }) => state.basket.items);
    const [totalPrice, setTotalPrice] = useState<string>('0.00');
    const totalItems = items.length;

    useEffect(() => {
        const price = items.reduce((total, item) => total + item.price, 0).toFixed(2);
        setTotalPrice(price);
    }, [items]);

    return (
        <div className="relative flex items-center flex-row">
            <span>{totalPrice}&nbsp;USD</span>
            <svg width="55px" height="55px" viewBox="0 0 24 24" fill="none"

                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                    stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div
                className={'rounded-full bg-red-600 p-2 text-white flex items-center justify-center absolute size-6 top-1 right-3'}>{totalItems}</div>
        </div>
    )
        ;
};

export default BasketCounter;