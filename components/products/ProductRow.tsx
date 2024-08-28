import Image from 'next/image';
import { IProduct } from '@/models/IProduct';
import { Rating } from '@mui/material';
import FormatPrice from '@/components/FormatPrice';
import BasketButton from '@/components/buttons/BasketButton';

const ProductRow = (product: IProduct) => {
    return (
        <div className={"flex flex-row border-gray-200 border-[0.5px]"}>
            <Image src={product.thumbnail} alt={product.title} width={200} height={200} />
            <div className={"flex flex-col w-1/2 py-6 space-y-2"}>
                <h1>{product.title}</h1>
                <Rating name="read-only" value={product.rating} readOnly />
                <p className={"font-light text-gray-700"}>{product.description}</p>
            </div>
            <div className={"flex flex-col self-end justify-center p-6"}>
                <h2 className={"text-2xl"}><FormatPrice price={product.price} />&nbsp;USD</h2>
            </div>
            <div className={"w-1/3 flex flex-col items-center justify-center"}>
                <BasketButton size={'large'} product={product} />
            </div>
        </div>
    );
}

export default ProductRow;