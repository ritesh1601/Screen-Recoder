"use client"

import React, { useState, useEffect } from 'react'
import DropdownList from "@/components/DropdownList";
import Image from "next/image";
import Link from "next/link";
import RecordScreen from "@/components/RecordScreen";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/lib/hooks/useDebounce";

const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
    const debouncedSearch = useDebounce(searchQuery, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (debouncedSearch) {
            params.set('query', debouncedSearch);
        } else {
            params.delete('query');
        }
        router.push(`?${params.toString()}`);
    }, [debouncedSearch, router, searchParams]);

    return (
        <header className="header">
            <section className="header-container">
                <figure className="details">
                    {userImg && (
                        <Image
                            src={userImg}
                            alt="user"
                            width={55}
                            height={55}
                            className="rounded-full" />
                    )}
                    <article>
                        <p>{subHeader}</p>
                        <h1>{title}</h1>
                    </article>
                </figure>

                    <aside>
                        <Link href="/upload">
                            <Image src="/assets/icons/upload.svg" alt="upload" width={16} height={16}/>
                            <span>Upload a video</span>
                        </Link>
                        <RecordScreen />
                    </aside>
            </section>

            <section className="search-filter">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search for videos, tags, folders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Image src="/assets/icons/search.svg" alt="search" width={16} height={16}/>
                </div>
                <DropdownList/>
            </section>
        </header>
    )
}
export default Header
