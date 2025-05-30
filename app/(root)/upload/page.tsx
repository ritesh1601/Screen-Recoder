"use client";

import './uploadCss.css';

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FormField from "@/components/FormField";
import FileInput from "@/components/FileInput";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import {
    getThumbnailUploadUrl,
    getVideoUploadUrl,
    saveVideoDetails,
} from "@/lib/actions/video";


const uploadFileToBunny = async (file: File, uploadUrl: string, accessKey: string): Promise<void> => {
    const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': file.type,
            AccessKey: accessKey,
        },
        body: file,
    });
    if (!response.ok) throw new Error('Upload failed.');
};


const Page = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visibility: "public",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>('');
    const [videoDuration, setVideoDuration] = useState(0);

    const video = useFileInput(MAX_VIDEO_SIZE);
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

    useEffect(() => {
        if (video.duration != null || video.duration === 0) {
            setVideoDuration(video.duration);
        }
    }, [video.duration]);

    useEffect(() => {
        const checkForRecordedVideo = async () => {
            try {
                const stored = sessionStorage.getItem("recordedVideo");
                if (!stored) return;

                const { url, name, type, duration } = JSON.parse(stored);

                // fetch Blob from recorded URL
                const blob = await fetch(url).then((res) => res.blob());

                const file = new File([blob], name, {
                    type,
                    lastModified: Date.now(),
                });

                if (video.inputRef.current) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    video.inputRef.current.files = dataTransfer.files;

                    const event = new Event("change", { bubbles: true });
                    video.inputRef.current.dispatchEvent(event);

                    video.handleFileChange?.({
                        target: { files: dataTransfer.files },
                    } as ChangeEvent<HTMLInputElement>);
                }

                if (duration) setVideoDuration(duration);

                sessionStorage.removeItem("recordedVideo");
                URL.revokeObjectURL(url);
            } catch (e) {
                console.error("Error loading recorded video:", e);
            }
        };

        checkForRecordedVideo();
    }, [video]);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!video.file || !thumbnail.file) {
                setError("Please upload video and thumbnail");
                return;
            }

            if (!formData.title || !formData.description || !formData.visibility) {
                setError("Please fill in all the details");
                return;
            }

            // upload the video to bunny
            // step 0 : Getting video upload url
            const {
                videoId,
                uploadUrl: videoUploadUrl,
                accessKey: videoAccessKey,
            } = await getVideoUploadUrl();

            if (!videoUploadUrl || !videoAccessKey) throw new Error('Failed to get video upload credentials');

            // step 1 : Upload the video
            await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

            // upload the thumbnail to DB
            const {
                uploadUrl: thumbnailUploadUrl,
                accessKey: thumbnailAccessKey,
                cdnUrl: thumbnailCdnUrl,
            } = await getThumbnailUploadUrl(videoId);

            if (!thumbnailUploadUrl || !thumbnailAccessKey)
                throw new Error('Failed to get thumbnail upload credentials');

            // Attach thumbnail
            await uploadFileToBunny(thumbnail.file, thumbnailUploadUrl, thumbnailAccessKey);

            // Create a new Db entry for the video details (urls, data)
            await saveVideoDetails({
                videoId,
                thumbnailUrl: thumbnailCdnUrl,
                ...formData,
                duration: videoDuration,
            });

            router.push(`/`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="wrapper-md page">
            <h1 className="text-2xl font-bold mb-4">Upload a Video</h1>

            {error && <div className="error-field text-red-500">{error}</div>}

            <form
                className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5"
                onSubmit={handleSubmit}
            >
                <FormField
                    id="title"
                    label="Title"
                    placeholder="Enter a clear and concise video title"
                    value={formData.title}
                    onChange={handleInputChange}
                />

                <FormField
                    id="description"
                    label="Description"
                    placeholder="Add an optional description"
                    as="textarea"
                    value={formData.description}
                    onChange={handleInputChange}
                />

                <FileInput
                    id="video"
                    label="Video"
                    accept="video/*"
                    file={video.file}
                    previewUrl={video.previewUrl}
                    inputRef={video.inputRef}
                    onChange={video.handleFileChange}
                    onReset={video.resetFile}
                    type="video"
                />

                <FileInput
                    id="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    file={thumbnail.file}
                    previewUrl={thumbnail.previewUrl}
                    inputRef={thumbnail.inputRef}
                    onChange={thumbnail.handleFileChange}
                    onReset={thumbnail.resetFile}
                    type="image"
                />

                <FormField
                    id="visibility"
                    label="Visibility"
                    as="select"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    options={[
                        { value: "public", label: "Public" },
                        { value: "private", label: "Private" },
                    ]}
                />

                <button type="submit" disabled={isSubmitting} className="submit-button">
                    {isSubmitting ? 'Uploading...' : 'Upload Video'}
                </button>
            </form>
        </div>
    );
};

export default Page;
