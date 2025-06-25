"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Newsletter from "./Newsletter";
import { FaGithub, FaHeart, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

const Footer = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();

  function triggerPageTransition() {
    document.documentElement.animate(
      [
        {
          clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)",
        },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0,0 0)",
        },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.9, 0, 0.1, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const handleNavigation =
    (path: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (path === pathname) {
        e.preventDefault();
        return;
      }
      router.push(path, {
        onTransitionReady: triggerPageTransition,
      });
    };

  return (
    <footer className="relative w-full min-h-[75svh] text-white bg-[#111] color-white flex flex-col items-center justify-between py-12">
      <div className="flex flex-col items-center gap-8 w-full">
          <nav className="flex gap-8 items-center">
            <span
              onClick={handleNavigation("/nerd")}
              className="hover:text-[#37517b] transition-colors duration-300"
            >
              Nerd
            </span>
            <span
              onClick={handleNavigation("/work")}
              className="hover:text-[#37517b] transition-colors duration-300"
            >
              Work
            </span>
            <span
              onClick={handleNavigation("/past")}
              className="hover:text-[#37517b] transition-colors duration-300"
            >
              Past
            </span>
          </nav>
          </div>
          <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center gap-12">
          <h1 className="text-[12vw] font-bold uppercase">Collaborate</h1>

          <p className="text-center text-gray-300">
            If you wanna connect, send me a mail at{" "}
            <a
              href="mailto:navdeep13dps@gmail.com"
              className="text-white underline hover:text-gray-300 transition-colors duration-300"
            >
              navdeep13dps@gmail.com
            </a>{" "}
            or DM me on socials!
          </p>

        <div className="flex flex-col items-center gap-8 w-full">
          <div className="flex gap-8 items-center">
            <Link
              href="https://github.com/Navdeep-Codes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#37517b] transition-colors duration-300"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://x.com/404Navdeep"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#37517b] transition-colors duration-300"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://www.youtube.com/@404Navdeep"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#37517b] transition-colors duration-300"
            >
              <FaYoutube />
            </Link>
          </div>

          

          
        </div>

        <div className="flex justify-between gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} 404Navdeep</p>
          <p>
            All Rights Reserved <span className="text-xs">(Hopefully)</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


