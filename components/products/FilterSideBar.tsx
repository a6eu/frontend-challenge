import Image from 'next/image';
import filterIco from '@/public/general icons/filters.svg';
import React from 'react';

type FilterProps = {
    setFilterOpen: (filter: boolean) => void;
    productsCount: number;
}

const Filter: React.FC<FilterProps> = ({ setFilterOpen, productsCount }) => {
    return (
        <div
            className={`z-50 absolute border-[1px] backdrop-blur-[9px] top-16 border-black bg-transparent left-0 w-[420px] pl-5 py-8`}>
            <div className={`flex w-full space-y-4 flex-col text-black`}>
                <div className={`flex flex-row items-center w-full justify-between pr-4`}>
                    <div className={`flex flex-row gap-2 items-center`}>
                        <div
                            className={`flex flex-row items-center`}>
                            <Image src={filterIco} className={`size-5`} alt={'Filter icon'} />
                            <h3 className={`text-[20px] mb-1`}>Фильтры</h3>
                        </div>
                        <div className={`text-[#2D2A2A] mb-1 text-sm text-nowrap`}>{productsCount}&nbsp;товар(а)</div>
                    </div>
                    <svg onClick={() => setFilterOpen(false)} className="cursor-pointer" width="12" height="12"
                         viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L11 11" stroke="black" strokeLinecap="round" />
                        <path d="M11 1L1 11" stroke="black" strokeLinecap="round" />
                    </svg>
                </div>
                <h3 className={`text-[14px]`}>Активные фильтры</h3>

            </div>
        </div>
    );
};

export default Filter;
