import { IProduct } from '@/models/IProduct';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { addItem, removeItem } from '@/redux/slices/basketSlice';

interface Props {
    product: IProduct;
    size: 'small' | 'large';
}

const BasketButton: React.FC<Props> = ({product, size}) => {
    const dispatch = useAppDispatch();
    const basketItems = useSelector((state: RootState) => state.basket.items);
    const [isInBasket, setIsInBasket] = useState<boolean>(false);

    useEffect(() => {
        const existingBasket = Cookies.get('basket') ? JSON.parse(Cookies.get('basket')!) : [];
        const isProductInBasket = existingBasket.some((item: IProduct) => item.id === product.id);
        setIsInBasket(isProductInBasket);
    }, [product.id]);

    useEffect(() => {
        const isProductInBasket = basketItems.some(item => item.id === product.id);
        setIsInBasket(isProductInBasket);
    }, [basketItems, product.id]);

    const handleAddToBasket = () => {
        dispatch(addItem(product));
        setIsInBasket(true);
    };

    const handleRemoveFromBasket = () => {
        dispatch(removeItem(product));
        setIsInBasket(false);
    };

    const handleToggleBasket = () => {
        if (isInBasket) {
            handleRemoveFromBasket();
        } else {
            handleAddToBasket();
        }
    };

    return (
        <button onClick={handleToggleBasket}>
            {isInBasket ? (
                <svg width={`${size === 'small' ? '25px' : '105px' }`} height={`${size === 'small' ? '25px' : '65px' }`} viewBox="-2.4 -2.4 28.80 28.80" fill="none"
                     xmlns="http://www.w3.org/2000/svg" stroke="#000000">

                    <g id="SVGRepo_bgCarrier" strokeWidth="0">

                        <path transform="translate(-2.4, -2.4), scale(1.7999999999999998)" fill="#7ed0ec"
                              d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
                              strokeWidth="0" />

                    </g>

                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                            stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>

                </svg>
            ) : (
                <svg width={`${size === 'small' ? '25px' : '105px' }`} height={`${size === 'small' ? '25px' : '65px' }`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                        stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </button>
    );
};

export default BasketButton;