import Image from 'next/image';
import { IProduct } from '@/models/IProduct';
import { Rating } from '@mui/material';
import FormatPrice from '@/components/FormatPrice';
import BasketButton from '../buttons/BasketButton';

const ProductCard = (product: IProduct) => {
    return (
        <div className="w-full h-[300px] text-black flex flex-col justify-center p-6 rounded-2xl shadow-md">
            <Image
                src={product.thumbnail}
                alt={product.title}
                width={200}
                height={200}
                objectFit="cover"
            />
            <h1>{product.title}</h1>
            <div className={'flex flex-row justify-between'}>
                <Rating name="read-only" value={product.rating} readOnly />
                <BasketButton size={'small'} product={product} />
            </div>
            <h2>
                <FormatPrice price={product.price} />
                &nbsp;USD
            </h2>
        </div>
    );
};

export default ProductCard;
