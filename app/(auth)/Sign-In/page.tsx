"use client"

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {authClient} from "@/lib/auth.client";

const Page = () => {
    const handleSignIn= async ()=>{
        return await authClient.signIn.social({provider:'google'});
    }

    return (
        <main className="sign-in">
            <aside className="testimonial">
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32}/>
                    <h1>ScreenShare</h1>
                </Link>

                <div className="description">
                    <section>
                        <figure>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Image src="/assets/icons/star.svg" alt="star" width={22} height={22} key={i} />
                            ))}
                        </figure>
                        <p>
                            SnapCast makes screen recording easy. From quick walkthroughs to
                            full presentations, it&apos;s fast, smooth, and shareable in seconds
                        </p>
                        <article>
                            <Image src="/assets/images/jason.png" alt="json" width={64} height={64} className="rounded-full"/>
                            <div>
                                <h2>Mark Hamsworth</h2>
                                <p>Product designer at JPL , California</p>
                            </div>
                        </article>
                    </section>
                </div>
                <p>© ScreenShare {(new Date()).getFullYear()}</p>
            </aside>
            <aside className="google-sign-in">
                <section>
                    <Link href="/">
                        <Image src="/assets/icons/logo.svg" alt="logo" width={64} height={64}/>
                        <h1>ScreenShare</h1>
                    </Link>
                    <p>Create and share your very first <span>ScreenShare video</span> in no time!</p>
                    <button onClick={handleSignIn}>
                        <Image src="/assets/icons/google.svg" alt="google" width={22} height={22}/>
                        <span>Sign In with Google</span>
                    </button>
                </section>
            </aside>
            <div className="overlay"/>
        </main>
    )
}
export default Page
