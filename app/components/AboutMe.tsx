"use client";

import { motion } from "framer-motion";
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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "60% bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about-me"
      className="relative min-h-[100vh]"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col justify-center">
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
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
