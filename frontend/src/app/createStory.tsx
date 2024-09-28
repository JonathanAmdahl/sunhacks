import React from "react";

export default function CreateStory() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-purple-800">Create Your Story</h1>
      <p className="mt-4 text-lg text-gray-600">
        Start creating your AI-powered story now!
      </p>
      <a
        href="/"
        className="mt-6 inline-block rounded-xl bg-purple-600 px-6 py-3 text-white transition-all hover:bg-purple-700"
      >
        Back to Home
      </a>
    </div>
  );
}
