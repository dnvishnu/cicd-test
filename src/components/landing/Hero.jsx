"use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import Login from "./Login";
import ConfigLoader from "../loaders/ConfigLoader";

export default function Hero() {
  const { configuration, configLoader } = useContext(AppContext);

  if (configLoader) return <ConfigLoader />;

  return (
    <div className="relative overflow-hidden bg-black">
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:inset-0 sm:block"
      >
        <svg
          fill="none"
          width={364}
          height={384}
          viewBox="0 0 364 384"
          className="absolute bottom-0 right-0 mb-48 translate-x-1/2 text-gray-700 lg:top-0 lg:mb-0 lg:mt-28 xl:translate-x-0"
        >
          <defs>
            <pattern
              x={0}
              y={0}
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} fill="currentColor" width={4} height={4} />
            </pattern>
          </defs>
          <rect
            fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
            width={364}
            height={384}
          />
        </svg>
      </div>
      <div className="relative pb-16 pt-6 sm:pb-24">
        <Popover>
          <nav
            aria-label="Global"
            className="relative mx-auto flex max-w-7xl items-center justify-between px-6"
          >
            <div className="flex flex-1 items-center">
              <div className="flex w-full items-center justify-between gap-2 md:w-auto">
                <a href="/">
                  <img
                    alt="Assistant Logo"
                    src={
                      configuration?.assistantLogo?.trim()
                        ? configuration.assistantLogo
                        : "https://storage.googleapis.com/kreatewebsites-assets/images/dataknobs-logo.webp"
                    }
                    className="h-8 w-auto sm:h-10"
                  />
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <PopoverButton className="focus-ring-inset relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                  </PopoverButton>
                </div>
              </div>
            </div>
            <div className="hidden md:flex">
              <a
                href="/signup"
                className="inline-flex items-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-700"
              >
                Sign up
              </a>
            </div>
          </nav>

          <PopoverPanel
            focus
            transition
            className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in md:hidden"
          >
            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/5">
              <div className="flex items-center justify-between px-5 pt-4">
                <div>
                  <img
                    alt="Assistant Logo"
                    src={
                      configuration?.assistantLogo?.trim()
                        ? configuration.assistantLogo
                        : "https://storage.googleapis.com/kreatewebsites-assets/images/dataknobs-logo.webp"
                    }
                    className="h-8 w-auto sm:h-10"
                  />
                </div>
                <div className="-mr-2">
                  <PopoverButton className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </PopoverButton>
                </div>
              </div>
              <a
                href="#"
                className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-100"
              >
                Log in
              </a>
            </div>
          </PopoverPanel>
        </Popover>

        <main className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    {configuration?.assistantTitle ||
                      "Your Personal AI Assistant for Smarter Living"}
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    {configuration?.assistantDescription ||
                      "Get expert help, automate tasks, and boost your productivity — all with a smart, personalized AI assistant designed to simplify your everyday life."}
                  </p>

                  <div className="mt-12 hidden sm:mb-4 sm:flex sm:justify-center lg:justify-start">
                    <a
                      href="#"
                      className="flex items-center rounded-full bg-gray-900 p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
                    >
                      <span className="rounded-full bg-green-500 px-3 py-0.5 text-sm font-semibold text-white">
                        Powered with AI
                      </span>
                      <span className="ml-4 text-sm">
                        Built using Kreatebots
                      </span>
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="ml-2 size-5 text-gray-500"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <Login />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
