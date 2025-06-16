"use client";

import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "@/components/elements/Sidebar";
import UserMenu from "@/components/elements/UserMenu";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children, route }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="grid flex-1 grid-cols-1"></div>

          <div className="flex items-center justify-around gap-x-4 lg:gap-x-6">
            <UserMenu />
          </div>
        </div>
      </div>
      <div className="lg:pl-72">
        {/* Topbar: Only visible on small and medium screens */}

        <main className="flex h-screen flex-col">
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </>
  );
}
