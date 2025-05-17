"use client"
import {createIframeLink} from "@/lib/utils";

const VideoPlayer = ({videoId}:VideoPlayerProps) => {
    return (
        <div className="video-player">
            <iframe
                src={createIframeLink(videoId)}
                loading="lazy"
                title="Video Player"
                allowFullScreen
                style={{border: 0 ,zIndex: 50}}
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture accelerometer; "
            />
        </div>
    )
}
export default VideoPlayer
