import React from 'react'
import DropdownList from "@/components/DropdownList";
import Image from "next/image";
import Link from "next/link";
import {ICONS} from "@/constants";
import RecordScreen from "@/components/RecordScreen";
// @ts-ignore
const Header = ({subHeader,title,userImg}:SharedHeaderProps) => {
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
                        placeholder="Search for videos ,tags , folders ... "
                    />
                    <Image src="/assets/icons/search.svg" alt="search" width={16} height={16}/>
                </div>
                <DropdownList/>
            </section>
        </header>
    )
}
export default Header
