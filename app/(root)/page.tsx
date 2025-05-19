import React from 'react'
import VideoCard from "@/components/VideoCard";
import Header from "@/components/Header"
import {getAllVideos} from "@/lib/actions/video";
import EmptyState from "@/components/EmptyState";
import Link from "next/link";

function searchParamsToObject(searchParams: Record<string, unknown> | URLSearchParams | undefined) {
    if (!searchParams || typeof searchParams !== 'object') return {};
    if (typeof (searchParams as URLSearchParams).entries === 'function') {
        // URLSearchParams instance
        return Object.fromEntries((searchParams as URLSearchParams).entries());
    }
    // Remove any function properties
    const obj: Record<string, string> = {};
    const plain = searchParams as Record<string, unknown>;
    for (const key in plain) {
        if (Object.prototype.hasOwnProperty.call(plain, key)) {
            const value = plain[key];
            if (typeof value !== 'function') {
                obj[key] = String(value);
            }
        }
    }
    return obj;
}

const Page = async ({searchParams}:SearchParams) => {
    const {query,filter,page} = searchParams;
    const currentPage = Number(page) || 1;
    const {videos,pagination}=await getAllVideos(query,filter,currentPage);
    const paramsObj = searchParamsToObject(searchParams);
    return (
        <main className="wrapper page ">
            <Header title="All Videos" subHeader="Public Library" />
            {/*<div className="video-grid">*/}
            {/*    {dummyCards.map((card) => (*/}
            {/*        <VideoCard key={card.id} {...card }/>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {videos?.length>0?(
                <>
                <section className="video-grid">
                    {videos.map(({video,user})=>(
                        <VideoCard
                            key={video.id}
                            {...video}
                            thumbnail={video.thumbnailUrl}
                            userImg={user?.image || ''}
                            username={user?.name || 'Guest'}
                        />
                    ))}
                </section>
                {/* Pagination Controls */}
                <nav className="pagination flex justify-center items-center gap-4 mt-8">
                    <Link
                        href={{
                            pathname: '/',
                            query: { ...paramsObj, page: currentPage - 1 }
                        }}
                        className={`px-4 py-2 rounded bg-gray-200 text-gray-700 ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                        aria-disabled={currentPage === 1}
                    >
                        Previous
                    </Link>
                    <span className="font-semibold">Page {pagination.currentPage} of {pagination.totalPages}</span>
                    <Link
                        href={{
                            pathname: '/',
                            query: { ...paramsObj, page: currentPage + 1 }
                        }}
                        className={`px-4 py-2 rounded bg-gray-200 text-gray-700 ${currentPage === pagination.totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                        aria-disabled={currentPage === pagination.totalPages}
                    >
                        Next
                    </Link>
                </nav>
                </>
            ):(
                <EmptyState icon="/assets/icons/video.svg" title="No Videos" description="Shi Se Search Karo"/>
            )}
        </main>
    );
}

export default Page
