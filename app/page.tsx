'use client';
import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { fetchProducts, selectProducts, selectProductsError, selectProductsStatus } from '@/redux/slices/productSlice';
import { useEffect, useState } from 'react';
import ProductsGrid from '@/components/products/ProductsGrid';
import { useSearchParams } from 'next/navigation';
import FilterSideBar from '@/components/products/FilterSideBar';
import ViewSelect from '@/components/buttons/ViewSelect';
import OrderSelect from '@/components/buttons/OrderSelect';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Home() {
    const dispatch = useAppDispatch();
    const products = useSelector(selectProducts);
    const error = useSelector(selectProductsError);
    const productStatus = useSelector(selectProductsStatus);
    const searchParams = useSearchParams();
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts(searchParams.toString()));
    }, [dispatch, searchParams]);

    if (productStatus === 'loading') {
        return <div className={"h-[70svh] flex items-center justify-center"}>
            <LoadingSpinner />
        </div>;
    }

    if (productStatus === 'failed') {
        return <div>Failed</div>;
    } else {
        return (
            <>
                <div className={"mt-24 flex w-full justify-between flex-row items-center gap-7"}>
                    <div className={'flex items-center gap-6'}>
                        <h1 className={"text-black text-lg"}>Products</h1>
                        <button onClick={() => setFilterOpen(!filterOpen)}>
                            <svg width="23" height="25" viewBox="0 0 22 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18 14H8M2 14H4M4 14C4 13.3333 4.4 12 6 12C7.6 12 8 13.3333 8 14M4 14C4 14.6667 4.4 16 6 16C7.6 16 8 14.6667 8 14M12 6C12 5.33333 12.4 4 14 4C15.6 4 16 5.33333 16 6C16 6.66667 15.6 8 14 8C12.4 8 12 6.66667 12 6Z"
                                    stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M2 6H12" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M16 6H18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <ViewSelect />
                    <OrderSelect />
                    {filterOpen &&
                        <FilterSideBar setFilterOpen={setFilterOpen} productsCount={products.length} />
                    }
                </div>
                <ProductsGrid products={products} />
            </>
        );
    }


}
