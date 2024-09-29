'use client'

import Image from "next/image";

interface TranscribeProps {
    text: string;
    imageUrl: string;
    width: number;
    height: number;
}

export default function Transcribes({ text, imageUrl, width, height }: TranscribeProps) {
    return (
        <div className="relative bg-white w-[50%] h-[100%] rounded-xl">
                <div className="flex flex-col items-center justify-center p-4">
                    <Image src={imageUrl} alt={text} width={width} height={height}/>
                </div>
            <button className="absolute bottom-0 right-0 mb-4 mr-4 text-3xl font-black text-white bg-[#8E60C0] px-4 py-2 rounded">
                Regenerate
            </button>
        </div>
    )
}