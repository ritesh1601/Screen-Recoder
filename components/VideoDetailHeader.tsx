"use client"
import {useState ,useEffect} from 'react'
import Image from "next/image";
import {useRouter} from "next/navigation";
import {daysAgo} from "@/lib/utils";
import { deleteVideoFromBunny, updateVideoVisibility } from "@/lib/actions/video";
import { authClient } from "@/lib/auth-client";

const VideoDetailHeader = (
    {
        title,
        createdAt,
        userImg,
        username,
        videoId,
        ownerId,
        id,
        visibility: visibilityProp,
    }: Omit<VideoDetailHeaderProps, 'thumbnailUrl'>
) => {


    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const router = useRouter()
    const { data: session } = authClient.useSession();
    const currentUserId = session?.user?.id;
    const [visibility, setVisibility] = useState(visibilityProp as 'public' | 'private');

    const handleCopyLink= ()=>{
        navigator.clipboard.writeText(`${window.location.origin}/video/${id}`);
        setCopied(true)
    }

    const handleDeleteVideo = async () => {
        setShowToast(true);
    };

    const confirmDelete = async () => {
        setShowToast(false);
        await deleteVideoFromBunny(videoId);
        router.push('/');
    };

    const toggleVisibility = async () => {
        const newVisibility = visibility === 'public' ? 'private' : 'public';
        setVisibility(newVisibility);
        try {
            await updateVideoVisibility(id, newVisibility);
        } catch {
            setVisibility(visibility);
        }
    };

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
            {currentUserId === ownerId && (
                <>
                    <button onClick={toggleVisibility}>
                        <Image src={visibility === 'public' ? '/assets/icons/eye.svg' : '/assets/icons/eye-off.svg'} alt="toggle visibility" width={32} height={32} className="rounded-full" />
                    </button>
                    <button onClick={handleDeleteVideo}>
                        <Image src="/assets/icons/trash.svg" alt="delete video" width={32} height={32} className="rounded-full" />
                    </button>
                </>
            )}
        </aside>
        {showToast && (
            <div className="toast">
                Are you sure you want to delete this video?
                <div className="toast-buttons">
                    <button onClick={confirmDelete} className="confirm-btn">Confirm</button>
                    <button onClick={() => setShowToast(false)} className="reject-btn">Cancel</button>
                </div>
            </div>
        )}
    </header>
    )
}
export default VideoDetailHeader
