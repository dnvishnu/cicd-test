"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  OAuthProvider,
} from "firebase/auth";
import { auth } from "@/app/firebase";

function Login() {
  const router = useRouter();
  const page = "/chat";
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [errormsg, setErrormsg] = useState("");

  const handleSuccess = () => {
    router.push(page);
  };

  const handlesubmission = () => {
    if (!value.email || !value.password) {
      setErrormsg("Fill in all fields");
    } else {
      signInWithEmailAndPassword(auth, value.email, value.password)
        .then((res) => {
          setValue({
            email: "",
            password: "",
          });
          handleSuccess();
        })
        .catch((error) => {
          setErrormsg(error.message);
          if (error.code === "auth/user-not-found") {
            setErrormsg("User not found. Please sign up.");
          }
        });
    }
  };

  // Google Sign-In
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // After successful login, redirect to chatbot page
        handleSuccess();
      })
      .catch((error) => {
        console.log("Error during Google Sign-In:", error.message);
      });
  };

  // Microsoft Sign-In
  const signInWithMicrosoft = () => {
    const provider = new OAuthProvider("microsoft.com");
    signInWithPopup(auth, provider)
      .then((result) => {
        handleSuccess();
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          setErrormsg(
            "An account with this email already exists. Sign in using the same provider you used during sign-up.",
          );
        }
      });
  };

  return (
    <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
      <div className="rounded-lg border border-slate-300 bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden">
        <div className="px-6 py-8 sm:px-10">
          <div>
            <p className="text-center text-sm font-medium text-gray-700">
              Sign in with
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <a
                  onClick={signInWithGoogle}
                  className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:cursor-pointer hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  onClick={signInWithMicrosoft}
                  className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:cursor-pointer hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Microsoft</span>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M3 3h8v8H3z"
                      fill="#F25022" // Orange
                    />
                    <path
                      d="M13 3h8v8h-8z"
                      fill="#7FBA00" // Green
                    />
                    <path
                      d="M3 13h8v8H3z"
                      fill="#00A4EF" // Blue
                    />
                    <path
                      d="M13 13h8v8h-8z"
                      fill="#FFB900" // Yellow
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="relative mt-6">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="mobile-or-email" className="sr-only">
                  Email
                </label>
                <input
                  id="mobile-or-email"
                  name="mobile-or-email"
                  type="text"
                  required
                  placeholder="Email"
                  autoComplete="email"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  autoComplete="new-password"
                  value={value.password}
                  onChange={(e) =>
                    setValue({ ...value, password: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              <div>
                <button
                  onClick={handlesubmission}
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-6 text-center sm:px-10">
          <p className="text-xs/5 text-gray-500">
            Sign in to talk with AI Assistant.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
