import React from 'react'
import VideoCard from "@/components/VideoCard";
import Header from "@/components/Header"
import {dummyCards} from "@/constants";
import {getAllVideos} from "@/lib/actions/video";
import EmptyState from "@/components/EmptyState";

const Page = async ({searchParams}:SearchParams) => {
    const {query,filter,page}=await searchParams;

    const {videos,pagination}=await getAllVideos(query,filter,Number(page)||1);
    return (
        <main className="wrapper page ">
            <Header title="All Videos" subHeader="Public Library" />
            {/*<div className="video-grid">*/}
            {/*    {dummyCards.map((card) => (*/}
            {/*        <VideoCard key={card.id} {...card }/>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {videos?.length>0?(
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
            ):(
                <EmptyState icon="/assets/icons/video.svg" title="No Videos" description="Shi Se Search Karo"/>
            )}
        </main>
    );
}

export default Page
