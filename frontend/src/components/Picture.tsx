"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface TranscribeProps {
  text: string;
  imageUrl: string | null; // Allow imageUrl to be nullable while loading
  width: number;
  height: number;
  onRegenerate: () => void;
}

export default function Transcribes({
  text,
  imageUrl,
  width,
  height,
  onRegenerate,
}: TranscribeProps) {
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (imageUrl) {
      setLoading(false); // Set loading to false when imageUrl exists
    }
  }, [imageUrl]);

  return (
    <div className="relative bg-white w-[50%] h-[100%] rounded-xl overflow-hidden">
      <div className="flex flex-col items-center justify-center p-4 h-full">
        {loading || !imageUrl ? (
          // Show loader when imageUrl is null or loading is true
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>{" "}
            {/* Tailwind spinner */}
          </div>
        ) : (
          // Show the image once it's loaded
          <Image
            src={imageUrl}
            alt={text}
            width={width}
            height={height}
            className="object-contain h-full max-h-full w-auto rounded-xl"
          />
        )}
      </div>
      <button
        className="absolute bottom-0 right-0 mb-4 mr-4 text-3xl font-black text-white bg-[#8E60C0] px-4 py-2 rounded-full"
        onClick={() => {
          setLoading(true); // Set loading to true when regenerating
          onRegenerate();
        }}
      >
        Regenerate
      </button>
    </div>
  );
}
