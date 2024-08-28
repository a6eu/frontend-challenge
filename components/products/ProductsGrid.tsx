'use client';
import { IProduct } from '@/models/IProduct';
import ProductCard from '@/components/products/ProductCard';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectTotal } from '@/redux/slices/productSlice';
import ProductRow from '@/components/products/ProductRow';

interface ProductsSectionProps {
    products: IProduct[];
}

const ProductsGrid: React.FC<ProductsSectionProps> = ({ products }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const productsPerPage = 10;
    const totalCount = useSelector(selectTotal);
    const totalPages = Math.ceil(products.length / productsPerPage);
    const router = useRouter();

    const [skip, setSkip] = useState<number>(Number(searchParams.get('skip')));
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);

    useEffect(() => {
        const newSkip = parseInt(searchParams.get('skip') || '0', 10);
        const validSkip = Math.max(0, Math.min(newSkip, totalCount - 1));
        setSkip(validSkip);
    }, [searchParams, totalCount]);

    useEffect(() => {
        const results = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        if (searchTerm.length > 0) {
            setFilteredProducts(results);
        } else {
            setFilteredProducts(products);
        }
    }, [searchTerm, products]);

    const handlePageChange = (page: number) => {
        const newSkip = (page - 1) * productsPerPage;
        if (newSkip < totalCount) {
            setSkip(newSkip);
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('skip', String(newSkip));

            const newUrl = `${pathname}?${newSearchParams.toString()}`;
            router.push(newUrl);
        }
    };

    const startIndex = skip;
    const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);
    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    const currentPage = Math.floor(skip / productsPerPage) + 1;

    return (
        <div className={'mt-5 flex flex-col'}>
            <input
                type="text"
                placeholder="Search products by title..."
                className="mb-4 p-2 border border-gray-300 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchParams.get('view') === 'grid' ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        {displayedProducts.length > 0 ? (
                            displayedProducts.map((product) => (
                                <ProductCard {...product} key={product.id} />
                            ))
                        ) : (
                            <div>No products found.</div>
                        )}
                    </div>
                </>
            ) : searchParams.get('view') === 'list' ? (
                <div className={'flex flex-col w-full'}>
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map((product) => (
                            <ProductRow {...product} key={product.id} />
                        ))
                    ) : (
                        <div>No products found.</div>
                    )}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        {displayedProducts.length > 0 ? (
                            displayedProducts.map((product) => (
                                <ProductCard {...product} key={product.id} />
                            ))
                        ) : (
                            <div>No products found.</div>
                        )}
                    </div>
                </>
            )}
            <div className="flex justify-center mt-5 mb-6">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );

};

export default ProductsGrid;
