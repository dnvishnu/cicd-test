import React, { useContext } from "react";
import {
  XMarkIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import SessionsLoader from "../loaders/SessionsLoader";

const navigation = [
  {
    name: "New Chat",
    href: `chat`,
    icon: PlusCircleIcon,
    active: ["chat"],
  },
  {
    name: "Profile",
    href: `profile`,
    icon: UserIcon,
    active: ["profile"],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar({ sidebarOpen, setSidebarOpen, handleOptionClick, route }) {
  const router = useRouter();
  const { sessions, activeSession, loader } = useContext(AppContext);
  const handleLogoClick = () => {
    router.push("/");
  };
  return (
    <>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-950/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 pb-4 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 cursor-pointer items-center gap-4">
                <img
                  alt="dataknobs-logo"
                  src="https://storage.googleapis.com/kreatewebsites-assets/images/dataknobs-logo.webp"
                  className="h-8 w-auto"
                />
                <h2
                  className="text-2xl font-bold text-gray-50"
                  onClick={handleLogoClick}
                >
                  Kreatebots
                </h2>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-6">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={classNames(
                                  item.active.includes(route)
                                    ? "bg-gray-800 text-white"
                                    : "cursor-pointer text-gray-400 hover:bg-gray-800 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className="size-6 shrink-0 text-gray-400"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      {/* 🔸 History Divider and Sessions */}
                      <li>
                        {loader ? (
                          <SessionsLoader />
                        ) : (
                          <ul role="list" className="-mx-2 space-y-6">
                            {sessions.map((session) => {
                              const isActive =
                                activeSession === session.session_id;
                              return (
                                <li key={session.session_id}>
                                  <Link
                                    href={`/chat?s=${session.session_id}`}
                                    className={classNames(
                                      isActive
                                        ? "bg-gray-800 text-white"
                                        : "cursor-pointer text-gray-400 hover:bg-gray-800 hover:text-white",
                                      "flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                                    )}
                                  >
                                    <div
                                      className={classNames(
                                        isActive
                                          ? "text-white"
                                          : "text-gray-400",
                                        "flex size-5 shrink-0 items-center justify-center rounded bg-gray-700 text-xs",
                                      )}
                                    >
                                      💬
                                    </div>
                                    {session.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-hidden bg-black px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center gap-4">
            <img
              alt="dataknobs-logo"
              src="https://storage.googleapis.com/kreatewebsites-assets/images/dataknobs-logo.webp"
              className="h-8 w-auto"
            />
            <h2
              className="cursor-pointer text-2xl font-bold text-gray-50"
              onClick={handleLogoClick}
            >
              Kreatebots
            </h2>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-6">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.active.includes(route)
                            ? "bg-gray-800 text-white"
                            : "cursor-pointer text-gray-400 hover:bg-gray-800 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* 🔸 History Divider and Sessions */}
              <li>
                {loader ? (
                  <SessionsLoader />
                ) : (
                  <ul role="list" className="-mx-2 space-y-6">
                    {sessions.map((session) => {
                      const isActive = activeSession === session.session_id;
                      return (
                        <li key={session.session_id}>
                          <Link
                            href={`/chat?s=${session.session_id}`}
                            className={classNames(
                              isActive
                                ? "bg-gray-800 text-white"
                                : "cursor-pointer text-gray-400 hover:bg-gray-800 hover:text-white",
                              "flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                            )}
                          >
                            <div
                              className={classNames(
                                isActive ? "text-white" : "text-gray-400",
                                "flex size-5 shrink-0 items-center justify-center rounded bg-gray-700 text-xs",
                              )}
                            >
                              💬
                            </div>
                            {session.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
