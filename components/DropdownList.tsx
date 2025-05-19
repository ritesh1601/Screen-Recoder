"use client"

import {useState} from "react";
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";

const filterOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'views', label: 'Most Viewed' }
] as const;

type FilterValue = typeof filterOptions[number]['value'];

const DropdownList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const currentFilter = searchParams.get('filter') || 'recent';
    const currentFilterLabel = filterOptions.find(opt => opt.value === currentFilter)?.label || 'Most Recent';

    const handleFilterChange = (filterValue: FilterValue) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('filter', filterValue);
        params.set('page', '1'); // Reset to first page when filter changes
        router.push(`/?${params.toString()}`);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="filter-trigger">
                    <figure>
                        <Image src="/assets/icons/hamburger.svg" alt="menu" width={15} height={15}/>
                        {currentFilterLabel}
                    </figure>
                    <Image src="/assets/icons/arrow-down.svg" alt="arrow-down" width={20} height={20}/>
                </div>
            </div>
            {isOpen && (
                <ul className="dropdown">
                    {filterOptions.map((option) => (
                        <li 
                            key={option.value} 
                            className={`list-item ${currentFilter === option.value ? 'active' : ''}`}
                            onClick={() => handleFilterChange(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DropdownList
