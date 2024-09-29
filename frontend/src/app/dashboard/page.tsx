"use client"; // <-- Correct "use client" directive

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
  const [fables, setFables] = useState<Fable[]>([
    {
      id: 1,
      title: "Fable 1",
      description: "Description of Fable 1",
      type: "Live Fable",
    },
    {
      id: 2,
      title: "Fable 2",
      description: "Description of Fable 2",
      type: "Scheduled Fable",
    },
  ]);

  const [currentFable, setCurrentFable] = useState<Fable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  const presentationRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Open Modal when Edit or Add button is clicked
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

  // Close Modal
  const closeModal = () => {
    setCurrentFable(null);
    setIsModalOpen(false);
  };

  // Save updated fable details
  const handleSave = () => {
    if (currentFable) {
      if (isNew) {
        setFables([...fables, currentFable]);
      } else {
        setFables(
          fables.map((fable) =>
            fable.id === currentFable.id ? currentFable : fable
          )
        );
      }
    }
    closeModal();
  };

  // Remove a Fable
  const handleRemove = (id: number) => {
    setFables(fables.filter((fable) => fable.id !== id));
  };

  // Open the presentation pop-up
  const openPresentationSettings = () => {
    setIsPresentationOpen(true);
  };

  // Close popups when clicking outside
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
          {/* Logo */}
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
        {/* New Fable Button */}
        <div className="w-full">
          <button
            className="bg-purple-600 hover:bg-purple-700 transition text-white py-3 px-8 rounded-xl text-2xl font-bold gap-2 font-header"
            onClick={() => openModal(null)}
          >
            + New Fable
          </button>
        </div>

        {/* Fable List */}
        <div className="mt-8 w-full space-y-6">
          {fables.map((fable) => (
            <div
              key={fable.id}
              className="bg-white text-purple-800 rounded-xl p-4 flex justify-between items-center shadow-lg font-body"
            >
              <div>
                <h2 className="text-2xl font-bold font-body">{fable.title}</h2>
                <p className="text-md text-[#A260DB]">{fable.description}</p>
              </div>
              <div className="flex items-center gap-4">
                {/* Play Button */}
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
                {/* Edit Button */}
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
                {/* Delete Button */}
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
              <Link href="/presentation-mode">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
                  Begin!
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white text-black p-8 rounded-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">
              {isNew ? "New Fable" : "Edit Fable"}
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={currentFable?.title || ""}
                  onChange={(e) =>
                    setCurrentFable((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                  className="w-full p-2 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={currentFable?.description || ""}
                  onChange={(e) =>
                    setCurrentFable((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  className="w-full p-2 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-[#A260DB] hover:bg-[#8E60C0] text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
