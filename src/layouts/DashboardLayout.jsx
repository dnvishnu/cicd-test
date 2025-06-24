"use client";

import { useContext, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "@/components/elements/Sidebar";
import UserMenu from "@/components/elements/UserMenu";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";

export default function DashboardLayout({ children, route }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { llm, model } = useContext(AppContext);

  const handleOptionClick = (option) => {
    router.push(`/${option.href}`);
  };

  return (
    <>
      <Sidebar {...{ sidebarOpen, setSidebarOpen, handleOptionClick, route }} />

      <div className="fixed top-0 z-40 flex h-16 w-full items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>

        <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

        <div className="flex flex-1 items-center justify-end gap-x-4 self-stretch lg:gap-x-6">
          {/* LLM & Model Display */}
          {llm && model && (
            <div className="mr-4 hidden flex-col items-end text-sm text-gray-600 sm:flex">
              <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                {llm.toUpperCase()} – {model}
              </div>
            </div>
          )}

          <UserMenu />
        </div>
      </div>

      <div className="lg:pl-72">
        <main className="flex h-screen flex-col">
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </>
  );
}
