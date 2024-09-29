"use client";

import Picture from "@/components/Picture";
import Transcribes from "@/components/Transcribes";
import { useRecordVoice } from "@/hooks/useRecordVoice";
import { useState, useEffect } from "react";
import OpenAI from "openai";

interface StoryItem {
  text: string;
  imageUrl: string;
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function CreateStory() {
  const { startRecording, stopRecording, text } = useRecordVoice();
  const [isRecording, setIsRecording] = useState(false);
  const [currentStory, setCurrentStory] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(false); // Add loading state for spinner
  const [imageUrl, setImageUrl] = useState("");

  const width = 1024;
  const height = 1024;
  const basePrompt =
    "Create a highly detailed and vibrant image in the style of art nouveau that captures the following scene from a story:";

  useEffect(() => {
    async function generateImage() {
      try {
        if (text === "") return;

        setLoading(true); // Set loading to true when generation starts
        const response = await openai.images.generate({
          model: "dall-e-2",
          prompt: basePrompt + text,
          n: 1,
          size: `${width}x${height}`,
        });

        const image_url = response.data[0]?.url || "";
        console.log(`Generated image URL: ${image_url}`);
        setImageUrl(image_url);
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setLoading(false); // Set loading to false when generation is done
      }
    }

    generateImage();
  }, [text]);

  const handleStartRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
    setIsRecording((oldState) => !oldState);
  };

  const handleNewPage = () => {
    setCurrentStory([...currentStory, { text: text, imageUrl: imageUrl }]);
    if (isRecording) {
      stopRecording();
      startRecording();
    }
  };

  const handleSaveStory = () => {
    console.log(currentStory);
  };

  return (
    <div className="bg-[#1E1E1E] h-screen w-screen items-center justify-center flex flex-col">
      <div className="flex gap-10 w-screen px-[10%] h-[70%] justify-center items-center mt">
        <Transcribes
          handleRecord={handleNewPage}
          isRecording={isRecording}
          text={text}
          isDisabled={false}
        />

        {/* Picture container with relative positioning to handle spinner overlay */}
        <div className="relative w-full h-full">
          {/* Conditionally show the loading spinner or the Picture component */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-[#8E60C0]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {/* Picture component */}
          <Picture
            text={text}
            imageUrl={imageUrl}
            width={width}
            height={height}
            onRegenerate={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
      <div className="w-full px-[10%] flex justify-between mt-10">
        <button
          onClick={handleStartRecording}
          className="px-10 py-2 rounded-full text-3xl font-black text-white bg-[#8E60C0]"
        >
          {isRecording ? "Stop" : "Start"} Recording
        </button>
        {currentStory.length > 0 && !isRecording && (
          <button
            onClick={handleSaveStory}
            className="text-3xl font-black text-white"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
