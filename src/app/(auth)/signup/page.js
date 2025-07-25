"use client";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/app/firebase";
import { Suspense, useState } from "react";

function SignupComponent() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const page = searchParam.get("page") || "register";

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [errormsg, setErrormsg] = useState("");

  const handleSuccess = () => {
    router.push(`/${page}`);
  };

  const handlesubmission = async () => {
    if (!value.name || !value.email || !value.password) {
      setErrormsg("Fill in all fields");
    } else {
      try {
        // Create a new user with email and password
        const res = await createUserWithEmailAndPassword(
          auth,
          value.email,
          value.password
        );
        const user = res.user;

        // Update user profile with the display name
        await updateProfile(user, {
          displayName: value.name,
        });

        // Create a user data object to store in Firestore
        const userData = {
          uid: user.uid, // Firebase UID
          name: value.name,
          email: value.email,
          credits: 0,
        };

        // If user_id exists in the URL, add it to the userData object
        if (user_id) {
          userData.user_id = user_id;
        }

        // Save the user details to the 'userdata' collection
        await addDoc(collection(db, "userdata"), userData);

        // Clear the form
        setValue({
          name: "",
          email: "",
          password: "",
        });

        // Redirect to the desired page
        router.push(loginredirect || "/");
      } catch (error) {
        setErrormsg(error.message);

        if (error.code === "auth/email-already-in-use") {
          setErrormsg(
            "An account with this email already exists. Please log in instead."
          );
        }
      }
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
        console.error("Error during Google Sign-In:", error.message);
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
            "An account with this email already exists. Sign in using the same provider you used during sign-up."
          );
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div className="flex h-screen items-center flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Your Company"
          src="https://storage.googleapis.com/kreatewebsites-assets/images/dataknobs-logo.webp"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handlesubmission}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={value.password}
                  onChange={(e) =>
                    setValue({ ...value, password: e.target.value })
                  }
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Sign up
              </button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm/6 font-medium">
                <span className="bg-white px-6 text-gray-900">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <a
                onClick={signInWithGoogle}
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent cursor-pointer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
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
                <span className="text-sm/6 font-semibold">Google</span>
              </a>

              <a
                onClick={signInWithMicrosoft}
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent cursor-pointer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
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
                <span className="text-sm/6 font-semibold">Microsoft</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Signup() {
  return (
    <Suspense>
      <SignupComponent />
    </Suspense>
  );
}
