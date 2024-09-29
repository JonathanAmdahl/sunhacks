"use client";
import OpenAI from "openai";
import dotenv from "dotenv";
import { useState, useEffect } from "react";
import styles from "./ImageGenerationDemo.module.css"; // Import the CSS module
import Image from "next/image";

interface ImageGenerationDemoProps {
  text: string;
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ImageGenerationDemo({
  text,
}: ImageGenerationDemoProps) {
  const width = 1024;
  const height = 1024;
  const basePrompt =
    "Create a highly detailed and vibrant image in the style of art nouveau that captures the following scene from a story:";

  dotenv.config(); // Load environment variables from .env file

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function generateImage() {
      try {
        if (text === "") return;

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
  }, [text]); // The effect runs when 'prompt' changes

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <p>{basePrompt + text}</p> {/* Display the prompt dynamically */}
      </div>
      {imageUrl ? (
        <Image
          className={styles.image}
          src={imageUrl}
          width={width}
          height={height}
          alt="Generated"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
