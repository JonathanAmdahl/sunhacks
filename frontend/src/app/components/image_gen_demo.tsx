"use client";
import OpenAI from "openai";
import dotenv from "dotenv";
import { useState, useEffect } from "react";
import styles from "./ImageGenerationDemo.module.css"; // Import the CSS module

export default function ImageGenerationDemo() {
  dotenv.config(); // Load environment variables from .env file

  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("a tall man walking over to his child");

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    async function generateImage() {
      try {
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: prompt, // Using the state variable for the prompt
          n: 1,
          size: "1024x1024",
        });

        const image_url = response.data[0]?.url || "";
        console.log(`Generated image URL: ${image_url}`);
        setImageUrl(image_url);
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }

    generateImage();
  }, [prompt]); // The effect runs when 'prompt' changes

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <p>{prompt}</p> {/* Display the prompt dynamically */}
      </div>
      {imageUrl ? (
        <img className={styles.image} src={imageUrl} alt="Generated" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
