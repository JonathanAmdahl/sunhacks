"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Fable {
  id: number;
  title: string;
  description: string;
  type: string;
}

export default function Dashboard() {
  const [fables, setFables] = useState<Fable[]>([]);
  const [currentFable, setCurrentFable] = useState<Fable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  const presentationRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Simulated user ID (you would normally get this from authentication context)
  const userId = 1; // Example user ID

  // Function to fetch fables for the current user
  const fetchUserFables = async () => {
    // Replace this with your data fetching logic (e.g., API call)
    const response = await fetch(`/api/fables?userId=${userId}`);
    const data = await response.json();
    setFables(data);
  };

  useEffect(() => {
    fetchUserFables();
  }, []);

  const openModal = (fable: Fable | null = null) => {
    setIsNew(fable === null);
    setCurrentFable(
      fable || {
        id: Date.now(),
        title: "",
        description: "",
        type: "Live Fable",
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentFable(null);
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    if (currentFable) {
      if (isNew) {
        // Post new fable to API
        await fetch(`/api/fables`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...currentFable, userId }), // Include user ID
        });
        setFables([...fables, currentFable]);
      } else {
        // Update existing fable
        await fetch(`/api/fables/${currentFable.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentFable),
        });
        setFables(
          fables.map((fable) =>
            fable.id === currentFable.id ? currentFable : fable
          )
        );
      }
    }
    closeModal();
  };

  const handleRemove = async (id: number) => {
    await fetch(`/api/fables/${id}`, { method: "DELETE" });
    setFables(fables.filter((fable) => fable.id !== id));
  };

  const openPresentationSettings = () => {
    setIsPresentationOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
      if (
        presentationRef.current &&
        !presentationRef.current.contains(event.target as Node)
      ) {
        setIsPresentationOpen(false);
      }
    };

    if (isModalOpen || isPresentationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isPresentationOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-[#101010] text-white">
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
          <button
            className="bg-[#A260DB] hover:bg-[#8E60C0] transition text-white py-3 px-8 rounded-xl text-2xl font-bold gap-2 font-header"
            onClick={() => openModal(null)}
          >
            + New Fable
          </button>
        </div>

        <div className="mt-8 w-full space-y-6">
          {fables.map((fable) => (
            <div
              key={fable.id}
              className="bg-white text-[#A260DB]  rounded-xl p-4 flex justify-between items-center shadow-lg font-body"
            >
              <div>
                <h2 className="text-2xl font-bold font-body">{fable.title}</h2>
                <p className="text-md text-[#A260DB]">{fable.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={openPresentationSettings}
                  className="text-green-600 hover:text-green-800"
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
                      d="M5 3l14 9-14 9V3z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => openModal(fable)}
                  className="text-[#A260DB] hover:text-[#8E60C0]"
                >
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

      {/* Presentation Settings Pop-up */}
      {isPresentationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={presentationRef}
            className="bg-[#A260DB] text-white p-8 rounded-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Presentation Settings</h2>

            <div className="mb-4">
              <label htmlFor="reader" className="block mb-2">
                Select Reader
              </label>
              <select id="reader" className="w-full p-2 text-black rounded-lg">
                <option>Select reader...</option>
                <option>Reader 1</option>
                <option>Reader 2</option>
              </select>
            </div>

            <div className="flex justify-end">
              <Link
                href="/present"
                className="bg-green-600 hover:bg-green-700 transition text-white py-2 px-4 rounded"
              >
                <button>Start Presentation</button>
              </Link>
              <button
                className="ml-2 bg-red-600 hover:bg-red-700 transition text-white py-2 px-4 rounded"
                onClick={() => setIsPresentationOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fable Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white text-black p-8 rounded-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">
              {isNew ? "New Fable" : "Edit Fable"}
            </h2>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={currentFable?.title || ""}
                onChange={(e) => {
                  if (currentFable) {
                    setCurrentFable({ ...currentFable, title: e.target.value });
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-2">
                Description
              </label>
              <textarea
                id="description"
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                value={currentFable?.description || ""}
                onChange={(e) => {
                  if (currentFable) {
                    setCurrentFable({
                      ...currentFable,
                      description: e.target.value,
                    });
                  }
                }}
              />
            </div>
            <div className="flex justify-end">
              <Link href="/create-story">
                <button
                  className="bg-[#A260DB]  hover:text-[#8E60C0] text-white py-2 px-4 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </Link>
              <button
                className="ml-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
