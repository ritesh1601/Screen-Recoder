import React from 'react'
import VideoCard from "@/components/VideoCard";
import Header from "@/components/Header"
import {dummyCards} from "@/constants";

const Page = () => {
    const DateToday = new Date();

    return (
        <main className="wrapper page ">
            <Header title="All Videos" subHeader="Public Library" />
            <div className="video-grid">
                {dummyCards.map((card) => (
                    <VideoCard key={card.id} {...card }/>
                ))}
            </div>
        </main>
    );
}

export default Page
