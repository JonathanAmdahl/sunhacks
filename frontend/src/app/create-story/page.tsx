'use client'

import Picture from "@/components/Picture";
import Transcribes from "@/components/Transcribes";
import { useRecordVoice } from "@/hooks/useRecordVoice";
import { useState, useEffect, useCallback } from "react";
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

  const width = 1024;
  const height = 1024;
  const basePrompt = "Create a highly detailed and vibrant image in the style of art nouveau that captures the following scene from a story:";

  const [imageUrl, setImageUrl] = useState("")

  const generateImage = useCallback(async () => {
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
      setIsDisabled(false)
    } catch (error) {
      console.error("Error generating image:", error);
    }
  }, [text])

  useEffect(() => {
    generateImage();
  }, [generateImage]);

  const handleStartRecording = () => {
    if (isRecording) {
      stopRecording();   
      setIsRecording(false)
    } 
    else {
      setCurrentStory([])
      startRecording();
      setIsRecording(true)
    }
  }

  const handleNewPage = () => {
    setCurrentStory(oldState => [...oldState, {text: text, imageUrl: imageUrl}]);
    if(isRecording) {
      setIsDisabled(true);
      stopRecording()
      startRecording()
    }
  }

  const handleSaveStory = () => {
    setIsRecording(false)
    console.log(currentStory)
    const pages = [...currentStory, {text: text, imageUrl: imageUrl}].filter(page => page.imageUrl && page.imageUrl !== "");

    const data = {
      title: `A Testing Story ${Math.round(Math.random() * 100)}`,
      pages
    };

    setTimeout(() => {
      fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setCurrentStory([])
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }, 3000); // 3000 milliseconds = 3 seconds
  }
  
    return (
      <div className="bg-[#1E1E1E] h-screen w-screen items-center justify-center flex flex-col">
        <div className="flex gap-10 w-screen px-[10%] h-[70%] justify-center items-center mt">
          <Transcribes handleRecord={handleNewPage} isRecording={isRecording} text={text} isDisabled={isDisabled} />
          <Picture text={text} imageUrl={imageUrl} width={width} height={height} onRegenerate={generateImage} //passes teh generateImage function here
          />
        </div>
        <div className='w-full px-[10%] flex justify-between mt-10'>
          <button onClick={handleStartRecording} className='px-10 py-2 rounded-full text-3xl font-black text-white bg-[#8E60C0] hover:bg-[#7D4FAF]'>
            {isRecording ? 'Stop' : 'Start'} Recording
          </button>
          {currentStory.length > 0 && !isRecording && !isDisabled && <button onClick={handleSaveStory} className='text-3xl font-black text-white'>
            Save
          </button>}
        </div>
      </div>
    )
}