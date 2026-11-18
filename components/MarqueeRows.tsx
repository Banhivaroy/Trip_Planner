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
      className="relative w-full overflow-hidden py-3 sm:py-4 flex flex-col gap-4 sm:gap-6 select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent),radial-gradient(circle_at_center,transparent_20%,black_60%)] md:[mask-composite:intersect]"
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
        className="flex shrink-0 items-center gap-5 sm:gap-8 px-4"
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((destination, index) => (
          <div key={index} className="flex items-center gap-4 sm:gap-6">
            <span className="text-base sm:text-xl font-bold tracking-wider uppercase text-emerald-900/50 md:text-emerald-900/40 opacity-85">
              {destination}
            </span>
            <span className="text-emerald-900/50 md:text-emerald-900/40 font-extrabold text-base sm:text-xl">
              ⟶
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}