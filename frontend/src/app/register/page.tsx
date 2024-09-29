"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("here");
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        setIsRegistered(true);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Sign Up
        </h2>
        <p className="text-center text-gray-600">
          Create an account to get started!
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {isRegistered ? (
          <div className="text-center">
            <p className="text-green-600">Registration successful!</p>
            <Link href="/dashboard">
              <p className="font-medium bg-[#A260DB] hover:bg-[#8E60C0]">
                Go to Dashboard
              </p>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E60C0]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E60C0]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#A260DB] hover:bg-[#8E60C0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8E60C0]"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}

        {!isRegistered && (
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login">
              <p className="font-medium text-[#A260DB] hover:text-[#8E60C0]">
                Log In
              </p>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
