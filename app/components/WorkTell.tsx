import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WorkTell = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

  

    const moveDist = window.innerWidth * 3;
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ".sticky",
      start: "top top",
      end: `+=${window.innerHeight * 5}px`,
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const vel = self.getVelocity();
        const normalizedVel = vel / Math.abs(vel) || 0;
        const maxOffset = 30;
        const curSpeed = Math.min(Math.abs(vel / 500), maxOffset);
        const isAtEdge = self.progress <= 0 || self.progress >= 1;

        gsap.to(titlesContainerRef.current, {
          x: -moveDist * self.progress,
          duration: 0.1,
          ease: "none",
        });

        const titles = document.querySelectorAll(".title");
        titles.forEach((title) => {
          const title1 = title.querySelector(".title-1");
          const title2 = title.querySelector(".title-2");
          const title3 = title.querySelector(".title-3");

          if (isAtEdge) {
            if (title1 && title2) {
              gsap.to([title1, title2], {
                xPercent: -50,
                x: 0,
                duration: 0.5,
                ease: "power2.out",
                overwrite: true,
              });
            }
          } else {
            const baseoffset = normalizedVel * curSpeed;

            if (title1) {
              gsap.to(title1, {
                xPercent: -50,
                x: `${baseoffset * 8}px`,
                duration: 0.2,
                ease: "power1.out",
                overwrite: "auto",
              });
            }

            if (title2) {
              gsap.to(title2, {
                xPercent: -50,
                x: `${baseoffset * 4}px`,
                duration: 0.2,
                ease: "power1.out",
                overwrite: "auto",
              });
            }
          }

          gsap.set(title3, {
            xPercent: -50,
            x: 0,
          });
        });

      },
    });

    return () => {
      gsap.killTweensOf("*");

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="sticky">
      <div ref={titlesContainerRef} className="titles">
        <div className="title text-center">
          <h1 className="title-1 text-6xl font-bold">The only way to do</h1>
          <h1 className="title-2 text-6xl font-bold">The only way to do</h1>
          <h1 className="title-3 text-6xl font-bold">The only way to do</h1>
        </div>
        <div className="title text-center">
          <h1 className="title-1 text-4xl text-gray-300 mt-2">great work</h1>
          <h1 className="title-2 text-4xl text-gray-300 mt-2">great work</h1>
          <h1 className="title-3 text-4xl text-gray-300 mt-2">great work</h1>
        </div>
        <div className="title text-center">
          <h1 className="title-1 text-2xl italic text-gray-400 mt-1">
            is to love
          </h1>
          <h1 className="title-2 text-2xl italic text-gray-400 mt-1">
            is to love
          </h1>
          <h1 className="title-3 text-2xl italic text-gray-400 mt-1">
            is to love
          </h1>
        </div>
        <div className="title text-center">
          <h1 className="title-1 text-xl text-white mt-3 font-medium">
            what you do.
          </h1>
          <h1 className="title-2 text-xl text-white mt-3 font-medium">
            what you do.
          </h1>
          <h1 className="title-3 text-xl text-white mt-3 font-medium">
            what you do.
          </h1>
          <p className="text-sm text-gray-500 mt-1">– Steve Jobs</p>
        </div>
      </div>
    </section>
  );
};

export default WorkTell;
