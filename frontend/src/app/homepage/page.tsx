"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("token")));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/homepage";
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-body">
      {/* Header */}
      <header className="flex w-full items-center justify-between bg-[#8E60C0] px-8 py-4 text-white">
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
          <Link href="/homepage">
            <h1 className="text-3xl font-bold font-header">Fable</h1>
          </Link>
        </div>
        <nav className="flex gap-6 items-center">
          {isLoggedIn ? (
            <>
              <Link href="#" onClick={logout}>
                <p className="hover:underline font-body">Log Out</p>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <p className="hover:underline font-body">Log In</p>
              </Link>
              <Link href="/register">
                <p className="bg-[#FC9E59] text-white px-4 py-2 rounded-full hover:bg-[#E88A4D] transition font-body">
                  Register Now
                </p>
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="mt-0 flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-16 w-full max-w-6xl mx-auto h-[600px]">
        {/* Left Content (Text) */}
        <div className="text-center sm:text-left sm:w-1/2">
          <h1 className="text-4xl font-extrabold text-[#8E60C0] leading-tight font-header">
            All-In-One Storytelling Hub.
            <br /> Author. Generate. Save.
          </h1>
          <p className="mt-4 max-w-lg text-lg text-[#FC9E59] font-body">
            Transform your stories into vivid, captivating visuals with our
            AI-powered storytelling platform, or generate your own!
          </p>
          <Link href={isLoggedIn ? "/dashboard" : "/register"}>
            <p className="mt-6 inline-block rounded-xl bg-[#8E60C0] px-6 py-3 text-white transition-all hover:bg-[#7A4FA8]">
              Create your story!
            </p>
          </Link>
        </div>

        {/* Right Content (Image) */}
        <div className="sm:w-1/2 flex justify-center sm:justify-end mt-0">
          <Image
            src="/images/illustration.png"
            alt="Fable Owl illustration"
            width={450}
            height={450}
            className="rounded-3xl"
            priority
          />
        </div>
      </main>

      {/* How It Works Section */}
      <section className="bg-[#8E60C0] text-white py-16 mt-16">
        <div className="w-full max-w-6xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-16 h-[650px]">
          {/* Left Content */}
          <div className="sm:w-1/2 text-center sm:text-left">
            <h2 className="text-5xl font-bold mb-6 font-header">
              How it works
            </h2>
            <p className="text-xl mb-8">
              Fable uses a combination of OpenAI tools for all your storytelling
              needs.
            </p>
            <p
              className="mt-6 inline-block rounded-full bg-[#FC9E59] px-8 py-4 text-white text-lg font-semibold transition-all hover:bg-[#E88A4D]"
            >
              Explore community stories
            </p>
          </div>

          {/* Right Content */}
          <div className="sm:w-1/2 text-left space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-2 font-header">Author.</h3>
              <p className="text-xl">
                Talk to transcribe and illustrate your storytelling in real
                time.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2 font-header">Generate.</h3>
              <p className="text-xl">
                Bring your existing stories to life with custom voices and
                illustrations.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2 font-header">Save.</h3>
              <p className="text-xl">
                Collect all your authored and generated stories all in one
                place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-[#8E60C0] py-8">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-8">
          <p className="text-lg">© 2024 Fable, Inc. All rights reserved.</p>
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
