'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import OpenAI from "openai";

interface TranscribeProps {
    text: string;
}

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

export default function Transcribes({ text }: TranscribeProps) {
    const width = 1024;
    const height = 1024;
    const basePrompt = "Create a highly detailed and vibrant image in the style of art nouveau that captures the following scene from a story:";

    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
      async function generateImage() {
        try {
          if(text === '') return;
        
          const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: basePrompt + text, // Using the state variable for the prompt
            n: 1,
            size: `${width}x${height}`,
          });
  
          const image_url = response.data[0]?.url || "";
          console.log(`Generated image URL: ${image_url}`);
          setImageUrl(image_url);
        } catch (error) {
          console.error("Error generating image:", error);
        }
      }
  
      generateImage();
    }, [text]);

    return (
        <div className="relative bg-white w-[50%] h-[100%]">
                <div className="flex flex-col items-center justify-center p-4">
                    <Image src={imageUrl} alt={text} width={width} height={height} className="max-w-full h-auto" />
                </div>
            <button className="absolute bottom-0 right-0 mb-4 mr-4 text-3xl font-black text-white bg-[#8E60C0] px-4 py-2 rounded">
                Regenerate
            </button>
        </div>
    )
}