"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getWorks } from "@/app/lib/server";
import { Work } from "../lib/types";
import { urlFor } from "@/sanity/lib/image";

const accentColors = [
  "#7B3737", 
  "#6B46C1", 
  "#3B4F1B",
  "#2C7A7B", 
  "#B89B2B", 
  "#E53E3E", 
];
const shapes = ["triangle", "circle", "square"];

const shapeSVG = (shape: string, color: string, ref: any) => {
  switch (shape) {
    case "triangle":
      return (
        <svg
          ref={ref}
          width="28"
          height="28"
          viewBox="0 0 32 32"
          className="inline-block mr-2 align-middle"
          style={{ opacity: 0 }}
        >
          <polygon points="16,4 28,28 4,28" fill={color} />
        </svg>
      );
    case "circle":
      return (
        <svg
          ref={ref}
          width="28"
          height="28"
          viewBox="0 0 32 32"
          className="inline-block mr-2 align-middle"
          style={{ opacity: 0 }}
        >
          <circle cx="16" cy="16" r="12" fill={color} />
        </svg>
      );
    case "square":
      return (
        <svg
          ref={ref}
          width="28"
          height="28"
          viewBox="0 0 32 32"
          className="inline-block mr-2 align-middle"
          style={{ opacity: 0 }}
        >
          <rect x="6" y="6" width="20" height="20" rx="4" fill={color} />
        </svg>
      );
    default:
      return null;
  }
};

const WorkInfo = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const svgRefs = useRef<(SVGSVGElement | null)[]>([]);
  const bgImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [projects, setProjects] = useState<Work[]>([]);

  const [preview, setPreview] = useState<{
    visible: boolean;
    x: number;
    y: number;
    img: string;
    alt: string;
  }>({ visible: false, x: 0, y: 0, img: "", alt: "" });
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getWorks();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { y: 60, opacity: 0, rotate: -2 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.18,
        }
      );
    }
    svgRefs.current.forEach((svg, i) => {
      if (svg) {
        gsap.fromTo(
          svg,
          { scale: 0, opacity: 0, rotate: -30 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 1.1,
            ease: "back.out(1.7)",
            delay: 0.3 + i * 0.18,
          }
        );
        gsap.to(svg, {
          rotate: 360,
          repeat: -1,
          duration: 18 + i * 2,
          ease: "linear",
          transformOrigin: "50% 50%",
        });
      }
    });
  }, [projects]);

  useEffect(() => {
    bgImgRefs.current.forEach((img, i) => {
      if (!img) return;
      if (hoveredIdx === i) {
        gsap.to(img, {
          autoAlpha: 1,
          scale: 1,
          filter: "grayscale(0.2)",
          duration: 0.7,
          ease: "power3.out",
          zIndex: 1,
        });
      } else {
        gsap.to(img, {
          autoAlpha: 0,
          scale: 1.08,
          filter: "grayscale(0.7)",
          duration: 0.7,
          ease: "power3.inOut",
          zIndex: 0,
        });
      }
    });
  }, [hoveredIdx]);

  useEffect(() => {
    if (previewRef.current && preview.visible) {
      gsap.to(previewRef.current, {
        x: preview.x,
        y: preview.y,
        scale: 1,
        autoAlpha: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    } else if (previewRef.current && !preview.visible) {
      gsap.to(previewRef.current, {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.2,
        ease: "power3.inOut",
      });
    }
  }, [preview]);


  const handleCardMouseLeave = () => {
    setPreview((prev) => ({ ...prev, visible: false }));
    setHoveredIdx(null);
  };

  return (
    <div className="workinfo-section flex py-10 items-center justify-center">
      {preview.visible && (
        <div
          ref={previewRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 50,
            width: 260,
            height: 180,
            transform: `translate3d(${preview.x}px, ${preview.y}px, 0)`,
          }}
          className="rounded-2xl shadow-2xl border border-white/30 bg-white/10 backdrop-blur-lg overflow-hidden scale-90 opacity-0 transition-all duration-200"
        >
          <img
            src={preview.img}
            alt={preview.alt}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      )}
      <span className="workinfo-bgword pointer-events-none select-none absolute text-[20vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black/5 font-black tracking-tight z-10">
        Stuff
      </span>
      <div className="w-full max-w-3xl px-4 z-20">
        <h2 className="workinfo-title text-3xl md:text-5xl font-bold text-neutral-900 mb-10 tracking-tight text-left">
          Cool Projects
        </h2>
        <div ref={listRef} className="flex flex-col gap-16 md:gap-20">
          {projects.map((project, idx) => {
            const accent = accentColors[idx % accentColors.length];
            const shape = shapes[idx % shapes.length];
            return (
              <div
                key={project.title}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 pb-10 border-b border-neutral-300 group hover:cursor-pointer ${
                  idx % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                onMouseLeave={handleCardMouseLeave}
              >
                <span
                  className={`hidden md:block absolute top-0 ${
                    idx % 2 === 1 ? "right-0" : "left-0"
                  } h-full w-1 rounded-full`}
                  style={{ background: accent, opacity: 0.18 }}
                />
                <span className="mt-1">
                  {shapeSVG(
                    shape,
                    accent,
                    (el: SVGSVGElement) => (svgRefs.current[idx] = el)
                  )}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="workinfo-title text-2xl md:text-4xl font-bold text-neutral-900 lowercase tracking-tight">
                      {project.title}
                    </h2>
                    <span className="workinfo-year text-xl md:text-2xl text-neutral-500 font-bold">
                      · {project.year}
                    </span>
                  </div>
                  <p className="text-neutral-500 mt-2 text-base md:text-lg max-w-xl">
                    {project.description}
                  </p>
                  <div className="flex gap-3 mt-4 flex-wrap">
                    {project.usefullinks?.map((link: any) => (
                      <a
                        key={link.name}
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 rounded-full bg-black/5 text-neutral-700 font-semibold text-base tracking-wide border border-black/10 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-sky-500/80 hover:text-white hover:border-sky-400/60 hover:shadow-lg"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-12">
          <a
            href="https://github.com/Navdeep-Codes?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 rounded-full bg-black/5 text-neutral-700 font-semibold text-base tracking-wide border border-black/10 shadow-sm backdrop-blur-md"
          >
            More Projects
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkInfo;


