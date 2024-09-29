'use client'

import Image from "next/image";

interface TranscribeProps {
    text: string;
    imageUrl: string;
    width: number;
    height: number;
    onRegenerate: () => void; //add this prop to regenerate functionality
}

export default function Transcribes({ text, imageUrl, width, height, onRegenerate }: TranscribeProps) {
    return (
        <div className="relative bg-white w-[50%] h-[100%] rounded-xl">
                <div className="flex flex-col items-center justify-center p-4">
                    <Image src={imageUrl} alt={text} width={width} height={height}/>
                </div>
            <button className="absolute bottom-0 right-0 mb-4 mr-4 text-3xl font-black text-white bg-[#8E60C0] px-4 py-2 rounded-full hover:bg-[#7D4FAF]"
                    onClick={onRegenerate} //attached the regenerate function to the onClick event
            >
                Regenerate
            </button>
        </div>
    )
}