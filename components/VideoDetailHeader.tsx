"use client"
import {useState ,useEffect} from 'react'
import Image from "next/image";
import {useRouter} from "next/navigation";
import {daysAgo} from "@/lib/utils";
const VideoDetailHeader = (
    {
        title,
        createdAt,
        userImg,
        username,
        videoId,
        ownerId,
        visibility,
        thumbnailUrl,
        id,
    }:VideoDetailHeaderProps
) => {


    const [copied, setCopied] = useState(false);

    const router = useRouter()
    const handleCopyLink= ()=>{
        navigator.clipboard.writeText(`${window.location.origin}/video/${id}`);
        setCopied(true)
    }
    useEffect(() => {
        const changeChecked=setTimeout(()=>{
            if(copied) setCopied(false);
        },2000)
        return ()=>clearTimeout(changeChecked)
    },[copied])
    return (
    <header className="detail-header">
        <aside className="user-info">
            <h1>{title}</h1>
            <figure>
                <button onClick={()=>router.push(`/profile/${ownerId}`)}>
                    <Image src={userImg || ''} alt="user Image" width={32} height={32} className="rounded-full" />
                    <h2>{username ?? 'Guest'}</h2>
                </button>
                <figcaption>
                    <span className="mt-1">‧</span>
                    <p>{daysAgo(createdAt)}</p>
                </figcaption>
            </figure>
        </aside>
        <aside className="cta">
            <button onClick={handleCopyLink}>
                <Image src={copied?'/assets/images/checked.png':'/assets/icons/link.svg'} alt="copy link" width={32} height={32} className="rounded-full" />
            </button>
        </aside>
    </header>
    )
}
export default VideoDetailHeader
