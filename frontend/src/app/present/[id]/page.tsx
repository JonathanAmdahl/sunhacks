"use client";

import LeftPage from "@/components/LeftPage";
import RightPage from "@/components/RightPage";
import PauseIcon from "../../../icons/Pause.svg";
import XIcon from "../../../icons/X.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Book {
  id: number;
  title: string;
  pages: Page[];
}

interface Page {
  id: number;
  text: string;
  imageUrl: string;
}

export default function Present() {
  const [book, setBook] = useState<Book | null>(null);
  const [page, setPage] = useState(0);
  const [, setAudioUrl] = useState(null);
  const [, setIsPlayerVisiblse] = useState(false);
  const [text, setText] = useState("Loading...");
  const [image, setImage] = useState("");

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchText = async () => {
      if (!id) {
        console.log("No id");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("success", data);
      setBook(data);
    };

    fetchText();
  }, [id]);

  useEffect(() => {
    if (book && book.pages && book.pages[page]) {
      setText(book.pages[page].text);
      setImage(book.pages[page].imageUrl);
      console.log("Fetched Image URL:", book.pages[page].imageUrl); // Add this line
    }
  }, [book, page]);

  const generateAudio = async () => {
    try {
      const response = await fetch("/api/textToSpeech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (data.url) {
        setAudioUrl(data.url);
        setIsPlayerVisiblse(true); // Show the audio player when the audio URL is set
        playAudio(data.url); // Play audio immediately after setting the URL
      }
    } catch (error) {
      console.error("Error generating audio:", error);
    }
  };

  const playAudio = (url: string) => {
    if (url) {
      const audio = new Audio(url);
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  const playAndPause = () => {
    generateAudio();
  };
  const handleRightPage = () => {
    if (!book) {
      return;
    }
    setPage((old) => {
      if (old + 1 >= book.pages.length) {
        return old;
      }
      return old + 1;
    });
  };
  const handleLeftPage = () => {
    setPage((old) => {
      if (old - 1 < 0) {
        return old;
      }
      return old - 1;
    });
  };

  return (
    <div className="w-screen h-screen px-[10%] py-[10%] bg-[#1E1E1E]">
      <div className="w-full flex">
        <div className="w-[calc(100%-5rem)] h-5"></div>
        <div className="w-20 flex gap-4 mb-5">
          <button
            onClick={playAndPause}
            className="w-8 h-8 flex items-center justify-center"
          >
            <Image width={20} height={15} alt="pause" src={PauseIcon} />
          </button>
          <Link href="/dashboard">
            <button className="w-8 h-8 flex items-center justify-center">
              <Image width={24} height={40} alt="exit" src={XIcon} />
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full h-full flex gap-8">
        <LeftPage text={text} />
        <RightPage src={image} />
      </div>
      <div className="w-full flex justify-between text-white font-body font-bold text-xl mt-4">
        <button onClick={handleLeftPage} className="flex items-center gap-2">
          &lt; Left Page
        </button>
        <button onClick={handleRightPage} className="flex items-center gap-2">
          Right Page &gt;
        </button>
      </div>
    </div>
  );
}
