"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Fable {
  id: number;
  title: string;
  description: string;
  type: string;
}

export default function Dashboard() {
  const [fables, setFables] = useState<Fable[]>([]);

  // Simulated user ID (you would normally get this from authentication context)
  const userId = 1; // Example user ID

  // Function to fetch fables for the current user
  const fetchUserFables = async () => {
    const response = await fetch(
      `http://localhost:3001/books?userId=${userId}`
    );
    const data = await response.json();
    console.log(data);
    setFables(data);
  };

  useEffect(() => {
    fetchUserFables();
  }, []);

  const handleRemove = async (id: number) => {
    await fetch(`/api/fables/${id}`, { method: "DELETE" });
    setFables(fables.filter((fable) => fable.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#1E1E1E] text-white">
      {/* Header */}
      <header className="flex w-full items-center justify-between bg-[#A260DB] px-8 py-4 text-white">
        <div className="flex items-center gap-4">
          <Link href="/homepage">
            <Image
              src="/images/Owl.png"
              alt="Fable logo"
              width={75}
              height={75}
            />
          </Link>
          <h1 className="text-3xl font-bold font-header">Fable Dashboard</h1>
        </div>
        <nav>
          <a className="hover:underline font-body">Explore Community Fables</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-start mt-10 w-full max-w-4xl mx-auto px-8">
        <div className="w-full">
          <Link href="/create-story">
            <button className="bg-[#A260DB] hover:bg-[#8E60C0] transition text-white py-3 px-8 rounded-xl text-2xl font-bold gap-2 font-header">
              + New Fable
            </button>
          </Link>
        </div>

        <div className="mt-8 w-full space-y-6">
          {fables.map((fable) => (
            <div
              key={fable.id}
              className="bg-white text-[#A260DB] rounded-xl p-4 flex justify-between items-center shadow-lg font-body"
            >
              <div>
                <h2 className="text-2xl font-bold">{fable.title}</h2>
                <p className="text-md text-[#A260DB]">{fable.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/present/${fable.id}`}>
                  <button className="text-green-600 hover:text-green-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 3l14 9-14 9V3z"
                      />
                    </svg>
                  </button>
                </Link>
                <Link href={`/edit/${fable.id}`}>
                  <button className="text-[#A260DB] hover:text-[#8E60C0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7.5 18.5l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                </Link>
                <button
                  onClick={() => handleRemove(fable.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
