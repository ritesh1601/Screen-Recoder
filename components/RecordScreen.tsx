'use client'
import { useState, useRef } from 'react';
import Image from 'next/image';
import { ICONS } from '@/constants';
import { useRouter } from 'next/navigation';
import { useScreenRecording } from '@/lib/hooks/useScreenRecording';

const RecordScreen = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);

    const {
        resetRecording,
        isRecording,
        recordedBlob,
        recordedVideoUrl,
        recordingDuration,
        startRecording,
        stopRecording,
    } = useScreenRecording();

    const closeModal = () => {
        resetRecording();
        setIsOpen(false);
    };

    const handleStart = async () => {
        await startRecording();
    };

    const recordAgain = async () => {
        resetRecording();
        await startRecording();

        if (recordedVideoUrl && videoRef.current) {
            videoRef.current.src = recordedVideoUrl;
        }
    };

    const goToUpload = () => {
        if (!recordedBlob) return; // ✅ Only proceed if recording exists

        const url = URL.createObjectURL(recordedBlob);

        sessionStorage.setItem(
            'recordedVideo',
            JSON.stringify({
                url,
                name: 'screen-recording.webm',
                type: recordedBlob.type,
                size: recordedBlob.size,
                duration: recordingDuration || 0,
            })
        );

        router.push('/upload');
        closeModal();
    };


    return (
        <div className="record">
            <button className="primary-btn" onClick={() => setIsOpen(true)}>
                <Image src={ICONS.record} alt="record" width={16} height={16} />
                <span>Record a video</span>
            </button>

            {isOpen && (
                <section className="dialog">
                    <div className="overlay-record" onClick={closeModal}/>
                        <div className="dialog-content">
                            <figure>
                                <h3>Screen Recording</h3>
                                <button onClick={closeModal}>
                                    <Image src={ICONS.close} alt="close" width={20} height={20} />
                                </button>
                            </figure>

                            <section>
                                {isRecording ? (
                                    <article>
                                        <div className="recording-indicator" />
                                        <span>Recording in Progress... ({recordingDuration}s)</span>
                                    </article>
                                ) : recordedVideoUrl ? (
                                    <video ref={videoRef} src={recordedVideoUrl} controls />
                                ) : (
                                    <p>Click record to start capturing your screen.</p>
                                )}
                            </section>

                            <div className="record-box">
                                {!isRecording && !recordedVideoUrl && (
                                    <button onClick={handleStart} className="record-start">
                                        <Image src={ICONS.record} alt="record" width={20} height={20} />
                                        Record
                                    </button>
                                )}
                                {isRecording && (
                                    <button className="record-stop" onClick={stopRecording}>
                                        <Image src={ICONS.record} alt="stop" width={20} height={20} />
                                        Stop Recording
                                    </button>
                                )}
                                {recordedVideoUrl && (
                                    <>
                                        <button onClick={recordAgain}>Record Again</button>
                                        <button className="record-upload" onClick={goToUpload}>
                                            <Image src={ICONS.upload} alt="upload" width={20} height={20} />
                                            CONTINUE TO UPLOAD
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                </section>
            )}
        </div>
    );
};

export default RecordScreen;
