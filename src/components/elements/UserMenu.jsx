import React, { useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AppContext } from "@/context/AppContext";

function UserMenu() {
  const { user, userCredits, handleSignOut } = useContext(AppContext);

  return (
    <>
      {/* Profile dropdown */}
      <Menu as="div" className="relative">
        <MenuButton className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open user menu</span>
          <img
            alt=""
            src={user && user.photoURL}
            className="size-8 rounded-full bg-gray-50"
          />
          <span className="hidden lg:flex lg:items-center">
            <span
              aria-hidden="true"
              className="ml-4 text-sm/6 font-semibold text-gray-900"
            >
              {user && user.displayName}
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className="ml-2 size-5 text-gray-400"
            />
          </span>
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-0 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <MenuItem>
            <a
              href="#credits"
              className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
            >
              Credits : {userCredits}
            </a>
          </MenuItem>
          <MenuItem>
            <a
              onClick={handleSignOut}
              className="block px-3 py-1 text-sm/6 text-gray-900 hover:cursor-pointer data-[focus]:bg-gray-50 data-[focus]:outline-none"
            >
              Sign out
            </a>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
}

export default UserMenu;
