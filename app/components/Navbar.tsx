"use client";

// React
import React from "react";

// Next Js
import Image from "next/image";

// Icons
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="from-black to-neutral-800 bg-gradient-to-r fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
          <Image src="/logo.webp" width={30} height={25.7} className="h-auto w-auto cursor-pointer" alt="logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white hover:text-neutral-200 transition duration-200 cursor-pointer">Pak Wheels</span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-4">
          <Link href="/login" className="text-white bg-gradient-to-r from-[#10a37f] to-[#27826c] hover:bg-gradient-to-bl font-medium rounded-lg text-md px-4 py-2 text-center cursor-pointer">
            Get started
          </Link>

          <button onClick={() => window.open("https://github.com/aliasif78/pak-wheels", "_blank")} className="text-white bg-gradient-to-r from-[#10a37f] to-[#27826c] hover:bg-gradient-to-bl font-medium rounded-lg text-md px-4 py-2 text-center flex flex-row gap-2 items-center">
            <FaGithub className="text-xl cursor-pointer" />
            <span className="cursor-pointer">GitHub</span>
          </button>
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li className="block py-2 px-3 rounded hover:text-[#2acea5] md:p-0 text-white bg-transparent cursor-pointer transition duration-200">About</li>
            <li className="block py-2 px-3 rounded hover:text-[#2acea5] md:p-0 text-white bg-transparent cursor-pointer transition duration-200">Contact Us</li>
            <li className="block py-2 px-3 bg-transparent rounded text-white hover:text-[#2acea5] md:p-0 cursor-pointer transition duration-200">Feedback</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
