"use client";

import Picture from "@/components/Picture";
import Transcribes from "@/components/Transcribes";
import { useState } from "react";

interface Page {
  id: number;
  text: string;
  imageUrl: string;
  bookId: number;
}

interface Story {
  id: number;
  title: string;
  pages: Page[];
}

interface PresentationModeProps {
  story: Story;
}

export default function PresentationMode({ story }: PresentationModeProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-[#1E1E1E] h-screen w-screen items-center justify-center flex flex-col">
      <div className="flex gap-10 w-screen px-[10%] h-[70%] justify-center items-center mt">
        <Transcribes
          text={story.pages[currentPage].text}
          isRecording={false}
          handleRecord={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Picture
          text={story.pages[currentPage].text}
          imageUrl={story.pages[currentPage].imageUrl}
          width={1024}
          height={1024}
        />
      </div>
      <div className="w-full px-[10%] flex justify-between mt-10">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`px-10 py-2 rounded-full text-3xl font-black text-white bg-[#8E60C0] ${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === story.pages.length - 1}
          className={`px-10 py-2 rounded-full text-3xl font-black text-white bg-[#8E60C0] ${
            currentPage === story.pages.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
