"use client";
import './uploadCss.css'
import FormField from "@/components/FormField";
import FileInput from "@/components/FileInput";
import {ChangeEvent, FormEvent, useRef, useState} from "react";
import {useFileInput} from "@/lib/hooks/useFileInput";
import {MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE} from "@/constants";

const Page = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visibility: "public",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [error, setError] = useState<string | null>('');

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const video=useFileInput(MAX_VIDEO_SIZE);
    const thumbnail=useFileInput(MAX_THUMBNAIL_SIZE);

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if(!video.file || !thumbnail.file){
                setError("Please upload video and thumbnail");
                return;
            }
            if(!formData.title || !formData.description || !formData.visibility){
                setError("Please fill in all the details");
                return;
            }

            //upload the video to bunny
            //upload the thumbnail to DB
            //Attach thumbnail
            //Create a new Db entry for the video details (urls, data)

        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="wrapper-md page">
            <h1 className="text-2xl font-bold mb-4">Upload a Video</h1>
            {error && <div className="error-field text-red-500">{error}</div>}

            <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5"
            onSubmit={handleSubmit}>
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
                    {isSubmitting ? 'Uploading...':'Upload Video'}
                </button>

            </form>
        </div>
    );
};

export default Page;
