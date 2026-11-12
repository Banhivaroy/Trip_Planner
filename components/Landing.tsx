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
    <main className="min-h-screen overflow-hidden text-[#1e3329] relative">
      {/* Navbar */}
      <Navbar session={session} />

      {/* Hero Container */}
      <div
        className="relative w-full h-[calc(100vh-4rem)] bg-center bg-no-repeat bg-cover flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/HeroBackdrop.png')" }}
      >
        {/* 1. Upper-Left Text Area */}
        <div className="absolute top-10 left-12 z-20 max-w-sm flex flex-col gap-3 pointer-events-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-800/70 bg-white/60 backdrop-blur-md px-3 py-1 rounded-full w-fit">
            Explore the World
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1e3329]">
            Your Next Great Adventure Awaits
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Discover breathtaking landscapes, vibrant cultures, and handpicked destinations curated just for you.
          </p>
        </div>

        {/* 2. Full-screen Animated Marquee Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-10">
          <MarqueeRows destinations={destinations} />
        </div>

        {/* 3. Bottom-Right Text Area */}
        <div className="absolute bottom-35 right-12 z-20 max-w-sm flex flex-col items-end text-right pointer-events-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1e3329]">
            Seamless Journey Planner
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed mb-4">
            Build custom itineraries, collaborate with friends, and book your dream getaway effortlessly.
          </p>
          
        </div>

        {/* Foreground Object / Globe & Person illustration component can sit here in the center */}
        {/* <div className="relative z-20 pointer-events-none"> ... </div> */}
      </div>
    </main>
  );
}