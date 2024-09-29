"use client"; // <-- Correct "use client" directive

import { useState } from "react";
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
  const [isNew, setIsNew] = useState(false); // To differentiate between editing and adding a new fable
  const [isPresentationOpen, setIsPresentationOpen] = useState(false); // To handle the presentation settings pop-up

  // Open Modal when Edit or Add button is clicked
  const openModal = (fable: Fable | null = null) => {
    setIsNew(fable === null); // If no fable is passed, we're adding a new one
    setCurrentFable(
      fable || {
        id: Date.now(),
        title: "",
        description: "",
        type: "Live Fable",
      }
    ); // If adding new, set a default fable with a unique ID
    setIsModalOpen(true); // Open the modal
  };

  // Close Modal
  const closeModal = () => {
    setCurrentFable(null); // Clear the current fable
    setIsModalOpen(false); // Close the modal
  };

  // Save updated fable details
  const handleSave = () => {
    if (currentFable) {
      if (isNew) {
        // Add new fable
        setFables([...fables, currentFable]);
      } else {
        // Update existing fable
        setFables(
          fables.map((fable) =>
            fable.id === currentFable.id ? currentFable : fable
          )
        );
      }
    }
    closeModal(); // Close the modal after saving
  };

  // Remove a Fable
  const handleRemove = (id: number) => {
    setFables(fables.filter((fable) => fable.id !== id)); // Filter out the fable with the matching ID
  };

  // Open the presentation pop-up
  const openPresentationSettings = () => {
    setIsPresentationOpen(true);
  };

  // Close the presentation pop-up
  const closePresentationSettings = () => {
    setIsPresentationOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#101010] text-white">
      {/* Header */}
      <header className="flex w-full items-center justify-between bg-[#A260DB] px-8 py-4 text-white">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Image
            src="/images/Owl.png"
            alt="Fable logo"
            width={100}
            height={100}
          />
          <h1 className="text-3xl font-bold">Fable Dashboard</h1>
        </div>
        <nav>
          <a className="hover:underline">Explore Community Fables</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-start mt-10 w-full max-w-4xl mx-auto px-8">
        {/* New Fable Button */}
        <div className="w-full">
          <button
            className="bg-purple-600 hover:bg-purple-700 transition text-white py-3 px-8 rounded-xl text-2xl font-bold gap-2"
            onClick={() => openModal(null)} // Open modal to add new fable
          >
            + New Fable
          </button>
        </div>

        {/* Fable List */}
        <div className="mt-8 w-full space-y-6">
          {fables.map((fable) => (
            <div
              key={fable.id}
              className="bg-white text-purple-800 rounded-xl p-4 flex justify-between items-center shadow-lg"
            >
              <div>
                <h2 className="text-2xl font-bold">{fable.title}</h2>
                <p className="text-md text-[#A260DB]">{fable.description}</p>
              </div>
              <div className="flex items-center gap-4">
                {/* Play Button */}
                <button
                  onClick={openPresentationSettings} // Open the presentation pop-up
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
                  onClick={() => openModal(fable)} // Open modal to edit existing fable
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
                  onClick={() => handleRemove(fable.id)} // Remove fable
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
          <div className="bg-[#A260DB] text-white p-8 rounded-lg w-full max-w-md">
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

      {/* Modal for Fable Settings */}
      {isModalOpen && currentFable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#A260DB] text-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {isNew ? "Add New Fable" : "Edit Fable"}
            </h2>

            {/* Input for Fable Title */}
            <div className="mb-4">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter fable title"
                className="w-full px-4 py-2 rounded-lg text-black"
                value={currentFable.title}
                onChange={(e) =>
                  setCurrentFable({
                    ...currentFable,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="Live Fable"
                  checked={currentFable.type === "Live Fable"}
                  onChange={() =>
                    setCurrentFable({ ...currentFable, type: "Live Fable" })
                  }
                />
                <label>Live Fable</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="Scheduled Fable"
                  checked={currentFable.type === "Scheduled Fable"}
                  onChange={() =>
                    setCurrentFable({
                      ...currentFable,
                      type: "Scheduled Fable",
                    })
                  }
                />
                <label>Scheduled Fable</label>
              </div>
            </div>

            {/* Input for Fable Description */}
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <input
                type="text"
                placeholder="Describe image style..."
                className="w-full px-4 py-2 rounded-lg text-black"
                value={currentFable.description}
                onChange={(e) =>
                  setCurrentFable({
                    ...currentFable,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleSave} // Save the new or edited fable
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
              >
                {isNew ? "Add" : "Save"}
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#101010] text-white py-6">
        <div className="flex justify-between items-center max-w-4xl mx-auto px-8">
          <p>&copy; 2024 Fable, Inc. All rights reserved.</p>
          <nav className="flex gap-6">
            <a className="hover:underline">Terms</a>
            <a className="hover:underline">Privacy</a>
            <a className="hover:underline">Join our Discord</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
