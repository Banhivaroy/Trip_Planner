"use client";

import { motion } from "framer-motion";

interface MarqueeRowsProps {
  destinations?: string[];
}

const DEFAULT_DESTINATIONS = [
  "Kolkata",
  "Assam",
  "Mumbai",
  "Delhi",
  "Goa",
  "Kerala",
  "Ladakh",
  "Jaipur",
];

export default function MarqueeRows({ destinations = DEFAULT_DESTINATIONS }: MarqueeRowsProps) {
  const repeatedItems = [...destinations, ...destinations, ...destinations, ...destinations];

  return (
    <div 
      className="relative w-full overflow-hidden py-4 flex flex-col gap-6 select-none"
      style={{
        // Smoothly fades out text near the edges and creates a radial fade-out at the center
        WebkitMaskImage: `
          linear-gradient(to right, transparent, black 15%, black 85%, transparent),
          radial-gradient(circle at center, transparent 20%, black 60%)
        `,
        WebkitMaskComposite: "source-in",
        maskImage: `
          linear-gradient(to right, transparent, black 15%, black 85%, transparent),
          radial-gradient(circle at center, transparent 20%, black 60%)
        `,
        maskComposite: "intersect",
      }}
    >
      {/* Top Row: Moves Left */}
      <MarqueeTrack items={repeatedItems} direction="left" speed={30} />

      {/* Bottom Row: Moves Right */}
      <MarqueeTrack items={repeatedItems} direction="right" speed={35} />
    </div>
  );
}

function MarqueeTrack({
  items,
  direction,
  speed,
}: {
  items: string[];
  direction: "left" | "right";
  speed: number;
}) {
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex shrink-0 items-center gap-8 px-4"
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((destination, index) => (
          <div key={index} className="flex items-center gap-6">
            <span className="text-xl font-bold tracking-wider uppercase text-emerald-900/40 opacity-75">
              {destination}
            </span>
            <span className="text-emerald-900/40 font-extrabold text-xl">⟶</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}