"use client"

import Link from "next/link";
import Image from "next/image";

declare interface VideoCardProps {
    id: string;
    title: string;
    thumbnail: string;
    createdAt: Date;
    userImage: string;
    userName: string;
    views: number;
    visibility: string;
    duration: number | null;
}

const VideoCard = ({
                       id,
                       title,
                       thumbnail,
                       createdAt,
                       userImage,
                       userName,
                       views,
                       visibility,
                       duration,
                   }: VideoCardProps) => {
    return (
        <Link href={`/videos/${id}`} className="video-card">
            <Image
                src={thumbnail}
                alt={`${title} Thumbnail`}
                width={290}
                height={160}
                className="thumbnail"
            />
            <article>
                <div>
                    <figure>
                        <Image
                            src={userImage || `/assets/images/dummy.jpg`}
                            alt="avatar"
                            width={32}
                            height={32}
                            className="rounded-full aspect-square"
                        />
                        <figcaption>
                            <h3>{userName}</h3>
                            <p>{visibility}</p>
                        </figcaption>
                    </figure>
                    <aside>
                        <Image
                            src="/assets/icons/eye.svg"
                            alt="views"
                            width={16}
                            height={16}
                        />
                        <span>{views}</span>
                    </aside>
                </div>
                <h2>
                    {title} -{" "}
                    {createdAt.toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </h2>
            </article>
            <button onClick={() => {}} className="copy-btn">
                <Image src="/assets/icons/link.svg" alt="copy" width={20} height={20} />
            </button>
            {duration && (
                <div className="duration">
                    {Math.ceil(duration / 60)} min
                </div>
            )}
        </Link>
    );
};

export default VideoCard;
