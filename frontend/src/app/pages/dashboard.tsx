import Image from "next/image";

export default function CreateStory() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-700 text-white">
      {/* Header */}
      <header className="flex w-full items-center justify-between bg-[#A260DB] px-8 py-4 text-white">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Image
            src="/images/Owl.png" // Assuming the logo is in the images folder
            alt="Fable logo"
            width={100}
            height={100}
          />
          <h1 className="text-3xl font-bold">Fable Dashboard</h1>
        </div>
        <nav>
          <a href="#" className="hover:underline">
            Explore Community Fables
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center mt-10 w-full max-w-4xl mx-auto">
        {/* New Fable Button */}
        <button className="bg-purple-600 hover:bg-purple-700 transition text-white py-3 px-8 rounded-xl text-2xl font-bold gap-2">
          + New Fable
        </button>

        {/* Fable List */}
        <div className="mt-8 w-full space-y-6">
          {/* Fable Item */}
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="bg-white text-purple-800 rounded-xl p-4 flex justify-between items-center shadow-lg"
            >
              <div>
                <h2 className="text-2xl font-bold">Title...</h2>
                <p className="text-md text-purple-500">
                  Description of the Fable...
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* Edit and Delete Icons */}
                <button className="text-purple-600 hover:text-purple-800">
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
                      d="M16.862 3.487l3.651 3.651a1.5 1.5 0 010 2.122l-9.464 9.464-4.497 1.121a.375.375 0 01-.463-.463l1.12-4.497 9.465-9.464a1.5 1.5 0 012.122 0z"
                    />
                  </svg>
                </button>
                <button className="text-red-600 hover:text-red-800">
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="flex justify-between items-center max-w-4xl mx-auto px-8">
          <p>&copy; 2024 Fable, Inc. All rights reserved.</p>
          <nav className="flex gap-6">
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Join our Discord
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
