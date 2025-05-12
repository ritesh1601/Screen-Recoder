"use client";

import React from "react";
import Image from "next/image";

interface FileInputProps {
    id: string;
    label: string;
    accept: string;
    file: File | null;
    previewUrl: string;
    inputRef: React.RefObject<HTMLInputElement>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onReset: () => void;
    type: "video" | "image";
}

const FileInput = ({
                       id,
                       label,
                       accept,
                       file,
                       previewUrl,
                       inputRef,
                       onChange,
                       onReset,
                       type,
                   }: FileInputProps) => {
    return (
        <section className="file-input w-full">
            <label htmlFor={id} className="block mb-2 font-medium">{label}</label>

            <input
                type="file"
                id={id}
                accept={accept}
                ref={inputRef}
                hidden
                onChange={onChange}
            />

            {!previewUrl ? (
                <figure
                    className="cursor-pointer border-2 border-dashed p-4 flex items-center justify-center flex-col gap-2 rounded-md"
                    onClick={() => inputRef.current?.click()}
                >
                    <Image src="/assets/icons/upload.svg" alt="upload" width={32} height={32} />
                    <p className="text-sm text-gray-500">Click to upload your {id}</p>
                </figure>
            ) : (
                <div className="relative border p-3 rounded-md bg-gray-50">
                    {type === "video" ? (
                        <video src={previewUrl} controls className="w-full rounded" />
                    ) : (
                        <Image
                            src={previewUrl}
                            alt="preview"
                            width={400}
                            height={225}
                            className="rounded"
                        />
                    )}
                    <button
                        type="button"
                        onClick={onReset}
                        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                    >
                        <Image src="/assets/icons/close.svg" alt="close" width={16} height={16} />
                    </button>
                    <p className="mt-2 text-sm text-gray-700 truncate">{file?.name}</p>
                </div>
            )}
        </section>
    );
};

export default FileInput;
