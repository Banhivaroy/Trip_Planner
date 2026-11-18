import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { auth } from "@/auth";
import Navbar from "./Navbar";
import MarqueeRows from "./MarqueeRows";

export default async function Landing() {
  const session = auth ? await auth() : null;

  const destinations = [
    "Kolkata",
    "Assam",
    "Mumbai",
    "Delhi",
    "Goa",
    "Kerala",
    "Ladakh",
    "Jaipur",
  ];

  return (
    <main className="min-h-screen overflow-x-hidden text-[#1e3329] relative flex flex-col">
      {/* Navbar */}
      <Navbar session={session} />

      {/* Hero Container */}
      <div
        className="relative w-full flex-1 min-h-[calc(100vh-4.5rem)] bg-center bg-no-repeat bg-cover flex flex-col justify-between px-5 py-8 md:block md:p-0 overflow-hidden"
        style={{ backgroundImage: "url('/HeroBackdrop.png')" }}
      >
        {/* 1. Upper-Left Text Area */}
        <div className="relative z-20 max-w-sm flex flex-col gap-3 pointer-events-auto bg-white/75 backdrop-blur-md p-4 rounded-2xl md:bg-transparent md:backdrop-blur-none md:p-0 md:rounded-none md:absolute md:top-10 md:left-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#1e3329]/80 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full w-fit">
            Explore the World
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1e3329]">
            Your Next Great Adventure Awaits
          </h1>
          <p className="text-sm text-neutral-700 leading-relaxed">
            Discover breathtaking landscapes, vibrant cultures, and handpicked destinations curated just for you.
          </p>
        </div>

        {/* 2. Full-screen Animated Marquee Overlay */}
        <div className="relative my-6 md:my-0 md:absolute md:inset-0 flex flex-col justify-center pointer-events-none z-10">
          <MarqueeRows destinations={destinations} />
        </div>

        {/* 3. Bottom-Right Text Area */}
        <div className="relative z-20 max-w-sm self-end flex flex-col items-end text-right pointer-events-auto bg-white/75 backdrop-blur-md p-4 rounded-2xl md:bg-transparent md:backdrop-blur-none md:p-0 md:rounded-none md:absolute md:bottom-24 lg:bottom-32 md:right-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1e3329]">
            Seamless Journey Planner
          </h2>
          <p className="text-sm text-neutral-700 leading-relaxed mb-4">
            Build custom itineraries, collaborate with friends, and book your dream getaway effortlessly.
          </p>
          <Link
            href="/plan"
            className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-5 py-3 text-sm font-damion text-white transition-all duration-200 hover:bg-white hover:text-black md:hidden"
          >
            Start Planning <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}