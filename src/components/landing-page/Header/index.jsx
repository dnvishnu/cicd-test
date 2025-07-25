"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import Calendar from "@/components/elements/Calendar";
import Badge from "@/components/elements/Badge";
import { AppContext } from "@/context/AppContext";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { FaSitemap } from "react-icons/fa";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ badge, active, page }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AppContext);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const initialDate = `${dd}-${mm}-${yyyy}`;

  const navigation = [
    {
      name: "Matches",
      href: `/${initialDate}`,
      current: active === "Matches",
    },
    { name: "Register", href: "/register", current: active === "Register" },
    { name: "Calendar", href: "#calendar", current: active === "Calendar" },
  ];

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleClick = (itemName) => {
    if (itemName === "Calendar") {
      toggleModal();
    } else {
      window.location.href = `/${itemName.toLowerCase()}`;
    }
  };

  const handleSignOut = (e) => {
    e.preventDefault();

    auth
      .signOut()
      .then(() => {
        router.push("/matches");
      })
      .catch((error) => {
        console.log("Sign out error:", error);
      });
  };

  return (
    <Disclosure as="nav" className="bg-gray-950">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <a className="flex shrink-0 items-center" href="/">
              <img
                alt="Dataknobs"
                src="https://storage.googleapis.com/kreatewebsites-assets/images/dataknobs-logo.webp"
                className="h-8 w-auto hidden lg:block"
              />
            </a>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    onClick={() => handleClick(item.name)}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <Badge badge={badge} />
          <a
            href={`/sitemap-view`}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
          >
            <FaSitemap />
          </a>
          {user ? (
            <a
              onClick={handleSignOut}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
            >
              Log out
            </a>
          ) : (
            <a
              href={`/login?page=${page}`}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
            >
              Log in
            </a>
          )}
        </div>
      </div>

      {/* Calendar Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <Calendar setIsModalOpen={setIsModalOpen} />
        </div>
      )}

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              onClick={() => handleClick(item.name)}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          {user ? (
            <a
              onClick={handleSignOut}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
            >
              Log out
            </a>
          ) : (
            <a
              href={`/login?page=${page}`}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
            >
              Log in
            </a>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
