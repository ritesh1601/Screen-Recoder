import React from 'react'
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import {getAllVideosByUser} from "@/lib/actions/video";
import {redirect} from "next/navigation";
import EmptyState from "@/components/EmptyState";
const Page =async ({params,searchParams}:ParamsWithSearch) => {
    const {id} =  await params;
    const {query,filter} = await searchParams;
    const {user,videos} =await getAllVideosByUser(id,query,filter);
    if(!user) redirect('/404');
    return (
        <div className="wrapper page">
            <Header subHeader={user?.email||"riteshsaini1601@gmail.com"} title={user?.name||"Ritesh Saini"} userImg={user?.image||"/assets/images/dummy.jpg"}/>
            {/*<section className="video-grid">*/}
            {/*    {dummyCards.map((card) => (*/}
            {/*        <VideoCard key={card.id} {...card }/>*/}
            {/*    ))}*/}
            {/*</section>*/}
            {videos?.length>0?(
                <section className="video-grid">
                    {videos.map(({video, user}) => (
                        <VideoCard
                            key={video.id}
                            id={video.id}
                            title={video.title}
                            thumbnailUrl={video.thumbnailUrl}
                            duration={video.duration}
                            createdAt={video.createdAt}
                            views={video.views}
                            username={user?.name || 'Guest'}
                            userImg={user?.image || '/assets/images/dummy.jpg'}
                        />
                    ))}
                </section>
            ):(
                <EmptyState icon="/assets/icons/video.svg" title="No Videos Available yet" description="Phle Upload to karo"/>
            )}
        </div>
    )
}
export default Page

