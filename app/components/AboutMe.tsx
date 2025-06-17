"use client";

import { motion } from "framer-motion";
import StatueModel from "./StatueModel";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Newsletter from "./Newsletter";
import Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  "Hi! I'm Navdeep, a 11 year old coder and organizer from Kashmir, India. I create things that passion me.",
  'since i was 7, computers and coding has been my main passion. It all started with playing games on a mobile phone and then dads laptop and now here on my laptop.',
  'by the time i hit 9, computers became a dream, making a app, website anyuthing, was what I wanted to do. I discovered how to create basic websites, and that was it, i was addicted! from there, i started building websites, apps,, exploring anything i could create with a computer.',
  'now at 11, my obsession with coding and creating hasn\'t slowed down it has gone even more up!. Making <a href="/work" class="text-[#37517b] underline">crazy stuff</a> is fun, but its not that rewarding an dwont get u hooked so here was my new finding <a href="https://hackclub.com" class="text-[#37517b] underline">Hack Club</a> its soo good and simple, code/make something get rewasrds for making it! They have different types of events like YSWS(You ship, We ship), Hackathons, Summer/Winter events and its all ran by teenagers under 18!! I also run one! Its called <a href="https://waffles.hackclub.com" class="text-[#37517b] underline">waffles</a>!!',
];

const AboutMe = () => {
  const statueContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (statueContainerRef.current && sectionRef.current) {
        const isMobile = window.innerWidth < 768;

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "60% bottom",
            scrub: 0.8,
            pin: statueContainerRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1,
            onUpdate: (self) => {
              if (isMobile) {
                gsap.to(statueContainerRef.current, {
                  y: 0,
                  scale: 1,
                  rotation: 0,
                  transformOrigin: "center center",
                  duration: 0.3,
                  ease: "power2.out",
                });
                return;
              }

              const rawProgress = self.progress;
              const easedProgress = gsap.utils.clamp(0, 1, rawProgress);
              const smoothProgress = gsap.utils.interpolate(
                0,
                1,
                easedProgress
              );

              const yTransform = smoothProgress * window.innerHeight * 0.15;
              const scaleTransform = 1 - smoothProgress * 0.15;
              const rotation = smoothProgress * 2; 
              gsap.to(statueContainerRef.current, {
                y: yTransform,
                scale: Math.max(0.85, scaleTransform),
                rotation: rotation,
                transformOrigin: "center center",
                duration: 0.3,
                ease: "power2.out",
              });
            },
          },
        });

        gsap.fromTo(
          statueContainerRef.current,
          {
            y: 0,
            scale: 1,
            opacity: 0,
            rotation: 0,
          },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about-me"
      className="relative min-h-[100vh] md:min-h-[150vh]"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 min-h-[90vh] md:min-h-screen">
          {/* Left: Text content */}
          <div className="max-w-2xl flex flex-col justify-center">
            {paragraphs.map((text, idx) => (
              <motion.p
                key={idx}
                className="text-black font-bold text-lg md:text-2xl leading-relaxed mb-4 md:mb-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{
                  duration: 0.9,
                  ease: "easeOut",
                  delay: idx * 0.1,
                }}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Newsletter className="mt-8" />
            </motion.div>
          </div>

          <div
            className="h-[30vh] md:h-screen flex items-center justify-center relative"
            ref={statueContainerRef}
          >
            <div className="relative w-full h-[50vh] md:h-full">
              <StatueModel />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-4 md:bottom-8 left-0 right-0 text-center px-4 py-2 md:py-4 rounded-t-lg"
              >
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Zeno of Citium
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl text-gray-600 italic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  stoics are cool
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
