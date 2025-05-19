"use client"

import { incrementVideoViews } from "@/lib/actions/video";
import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
    id: string;
    title: string;
    thumbnailUrl: string;
    duration: number | null;
    createdAt: Date;
    views: number;
    username: string;
    userImg: string;
}

export default function VideoCard({
    id,
    title,
    thumbnailUrl,
    duration,
    createdAt,
    views,
    username,
    userImg,
}: VideoCardProps) {
    const handleClick = async () => {
        try {
            await incrementVideoViews(id);
        } catch (error) {
            console.error("Error incrementing view count:", error);
        }
    };

    // Format date in a consistent way
    const formattedDate = new Date(createdAt).toISOString().split('T')[0];

    return (
        <Link 
            href={`/video/${id}`}
            className="group cursor-pointer"
            onClick={handleClick}
        >
            <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                    src={thumbnailUrl}
                    alt={title}
                    width={290}
                    height={160}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {duration && (
                    <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
                        {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
                    </div>
                )}
            </div>
            <div className="mt-3 flex gap-3">
                <Image
                    src={userImg}
                    alt={username}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full"
                />
                <div>
                    <h3 className="font-medium line-clamp-2">{title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{username}</p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <span>{views.toLocaleString()} views</span>
                        <span>•</span>
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
