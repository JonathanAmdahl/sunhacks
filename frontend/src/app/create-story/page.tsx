"use client";

import Picture from "@/components/Picture";
import Transcribes from "@/components/Transcribes";
import { useRecordVoice } from "@/hooks/useRecordVoice";
import { useState, useEffect, useRef } from "react";
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
  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState("");

  const width = 1024;
  const height = 1024;
  const basePrompt =
    "Create a highly detailed and vibrant image in the style of art nouveau that captures the following scene from a story:";

  useEffect(() => {
    async function generateImage() {
      try {
        if (text === "") return;

        const response = await openai.images.generate({
          model: "dall-e-2",
          prompt: basePrompt + text,
          n: 1,
          size: `${width}x${height}`,
        });

        const image_url = response.data[0]?.url || "";
        console.log(`Generated image URL: ${image_url}`);
        setImageUrl(image_url);
        setIsDisabled(false);
      } catch (error) {
        console.error("Error generating image:", error);
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
      setIsDisabled(true);
      stopRecording();
      startRecording();
    }
  };

  const handleSaveStory = () => {
    const data = {
      userId: localStorage.getItem("token"),
      title,
      description,
      pages: currentStory,
    };

    setTimeout(() => {
      fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setCurrentStory([]);
          window.history.pushState(null, "", "/dashboard");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  return (
    <div className="bg-[#1E1E1E] h-screen w-screen items-center justify-center flex flex-col">
      <div className="flex gap-10 w-screen px-[10%] h-[70%] justify-center items-center mt">
        <Transcribes
          handleRecord={handleNewPage}
          isRecording={isRecording}
          text={text}
          isDisabled={isDisabled}
        />

        {/* Picture container with relative positioning to handle spinner overlay */}
        <div className="relative w-full h-full">

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
        {currentStory.length > 0 && !isRecording && !isDisabled && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-3xl font-black text-white"
          >
            Save
          </button>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-[#A260DB] font-header">
              {"Create New Fable"}
            </h2>

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block mb-2 text-lg text-[#A260DB] outline-2 font-header"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 text-black rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block mb-2 text-lg text-[#A260DB] font-header "
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 text-black rounded-lg border-[#A260DB] border-2 focus:ring-[#6d4a93]"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStory}
                className="bg-[#A260DB] hover:bg-[#8E60C0] text-white py-2 px-4 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
