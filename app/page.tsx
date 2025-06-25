"use client";

import HeroText from "./components/HeroText";
import Navbar from "./components/Navbar";
import AboutMe from "./components/AboutMe";
import { Revealer } from "./components/Revealer";
import Footer from "./components/Footer";
import Substack from "./components/Substack";
import type { FC } from "react";

const Home: FC = () => {
  return (
    <main className="relative w-full home">
      <Revealer />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <HeroText />
      </div>

      <section className="content-sections">
        <AboutMe />
        <Substack />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
