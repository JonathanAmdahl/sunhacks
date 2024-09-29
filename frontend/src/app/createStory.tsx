import React from "react";

export default function CreateStory() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-[#8E60C0]">Create Your Story</h1>
      <p className="mt-4 text-lg text-gray-600">
        Start creating your AI-powered story now!
      </p>
      <a
        href="/"
        className="mt-6 inline-block rounded-xl bg-[#8E60C0] px-6 py-3 text-white transition-all hover:bg-[#7A4FA8]"
      >
        Back to Home
      </a>
    </div>
  );
}
