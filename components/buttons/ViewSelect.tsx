import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ViewSelect = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('view', value);

        const newUrl = `${pathname}?${newSearchParams.toString()}`;
        router.push(newUrl);
    }

    return (
        <div className="flex items-center self-end flex-row">
            <svg width="23px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M9 6C9 4.34315 7.65685 3 6 3H4C2.34315 3 1 4.34315 1 6V8C1 9.65685 2.34315 11 4 11H6C7.65685 11 9 9.65685 9 8V6ZM7 6C7 5.44772 6.55228 5 6 5H4C3.44772 5 3 5.44772 3 6V8C3 8.55228 3.44772 9 4 9H6C6.55228 9 7 8.55228 7 8V6Z"
                      fill="#0F0F0F" />
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M9 16C9 14.3431 7.65685 13 6 13H4C2.34315 13 1 14.3431 1 16V18C1 19.6569 2.34315 21 4 21H6C7.65685 21 9 19.6569 9 18V16ZM7 16C7 15.4477 6.55228 15 6 15H4C3.44772 15 3 15.4477 3 16V18C3 18.5523 3.44772 19 4 19H6C6.55228 19 7 18.5523 7 18V16Z"
                      fill="#0F0F0F" />
                <path
                    d="M11 7C11 6.44772 11.4477 6 12 6H22C22.5523 6 23 6.44772 23 7C23 7.55228 22.5523 8 22 8H12C11.4477 8 11 7.55228 11 7Z"
                    fill="#0F0F0F" />
                <path
                    d="M11 17C11 16.4477 11.4477 16 12 16H22C22.5523 16 23 16.4477 23 17C23 17.5523 22.5523 18 22 18H12C11.4477 18 11 17.5523 11 17Z"
                    fill="#0F0F0F" />
            </svg>
            <select
                defaultValue={searchParams.get('view') || 'grid'}
                onChange={(event) => handleChange(event)}
                className={"mb-1"} name="view" id="view">
                <option value="grid">grid</option>
                <option value="list">list</option>
            </select>
        </div>
    );
};

export default ViewSelect;