"use client";

import LeftPage from "@/components/LeftPage";
import RightPage from "@/components/RightPage";
import PauseIcon from "../../icons/Pause.svg";
import XIcon from "../../icons/X.svg";
import Image from "next/image";
import Link from "next/link";

export default function Present() {
  const playAndPause = () => {};
  const handleRightPage = () => {};
  const handleLeftPage = () => {};

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
        <LeftPage text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
        <RightPage src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-jZYbI9BTvfbB47xnnGwoTFXa/user-wX3hRm7ClR4Jw5JO8OC02l07/img-hxFqITm9sbhQMWUutiW5kq45.png?st=2024-09-29T05%3A57%3A48Z&se=2024-09-29T07%3A57%3A48Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-29T01%3A09%3A41Z&ske=2024-09-30T01%3A09%3A41Z&sks=b&skv=2024-08-04&sig=3y8tTTurYHVEkt2B%2Bq1wMNUErAfs/IZedKH/q4Mdy1o%3D" />
      </div>
      <div className="w-full flex justify-between text-white font-body font-bold text-xl mt-4">
        <button onClick={handleLeftPage} className="flex items-center gap-2">
          &lt; Previous Page
        </button>
        <button onClick={handleRightPage} className="flex items-center gap-2">
          Next Page &gt;
        </button>
      </div>
    </div>
  );
}
