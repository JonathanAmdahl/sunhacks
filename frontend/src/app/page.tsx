import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="flex w-full items-center justify-between bg-purple-600 px-8 py-4 text-white">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Image
            src="/images/Owl.png"
            alt="Fable logo"
            width={100}
            height={100}
          />
          <h1 className="text-3xl font-bold">Fable</h1>
        </div>
        <nav className="flex gap-6 items-center">
          <a href="#" className="hover:underline">
            Log In
          </a>
          <a
            href="#"
            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
          >
            Register Now
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-16 w-full max-w-6xl mx-auto h-[720px]">
        {/* Left Content (Text) */}
        <div className="text-center sm:text-left sm:w-1/2">
          <h1 className="text-4xl font-extrabold text-purple-800 leading-tight">
            All-In-One Storytelling Hub.
            <br /> Author. Generate. Save.
          </h1>
          <p className="mt-4 max-w-lg text-lg text-orange-500">
            Transform your stories into vivid, captivating visuals with our
            AI-powered storytelling platform, or generate your own!
          </p>
          <Link href="/create-story">
            {" "}
            {/* Link to new page */}
            <a className="mt-6 inline-block rounded-xl bg-purple-600 px-6 py-3 text-white transition-all hover:bg-purple-700">
              Create your story!
            </a>
          </Link>
        </div>

        {/* Right Content (Image) */}
        <div className="sm:w-1/2 flex justify-center sm:justify-end">
          <Image
            src="/images/illustration.png"
            alt="Fable Owl illustration"
            width={700}
            height={700}
            className="rounded-3xl"
            priority
          />
        </div>
      </main>

      {/* How It Works Section */}
      <section className="bg-purple-600 text-white py-16 mt-16">
        <div className="w-full max-w-6xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-16">
          {/* Left Content */}
          <div className="sm:w-1/2 text-center sm:text-left">
            <h2 className="text-4xl font-bold mb-6 font-paytone">
              How it works
            </h2>
            <p className="text-lg mb-8">
              Fable uses a combination of OpenAI tools for all your storytelling
              needs.
            </p>
            <a
              href="#"
              className="mt-6 inline-block rounded-full bg-orange-500 px-8 py-4 text-white text-lg font-semibold transition-all hover:bg-orange-600"
            >
              Explore community stories
            </a>
          </div>

          {/* Right Content */}
          <div className="sm:w-1/2 text-left space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Author.</h3>
              <p className="text-base">
                Talk to transcribe and illustrate your storytelling in real
                time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Generate.</h3>
              <p className="text-base">
                Bring your existing stories to life with custom voices and
                illustrations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Save.</h3>
              <p className="text-base">
                Collect all your authored and generated stories all in one
                place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-purple-600 py-8">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-8">
          <p className="text-lg">
            &copy; 2024 Fable, Inc. All rights reserved.
          </p>
          <nav className="flex gap-8">
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
