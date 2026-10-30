"use client"
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Compass,
  Globe2,
  MapPin,
  MapPinned,
  Route,
  Sparkles,
} from "lucide-react";
import { logIn, logOut } from "@/lib/auth-actions";



const destinations = [
  {
    name: "The Italian Coast",
    location: "Cinque Terre, Italy",
    duration: "5 days",
    image:
      "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=900&q=85",
    tag: "Coastal escape",
  },
  {
    name: "Into the Mountains",
    location: "Swiss Alps, Switzerland",
    duration: "7 days",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
    tag: "Nature & adventure",
  },
  {
    name: "The Kyoto Diaries",
    location: "Kyoto, Japan",
    duration: "4 days",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85",
    tag: "Culture & discovery",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "AI-ready trip planning",
    description:
      "Build a personalized itinerary around your interests, time, and travel style.",
  },
  {
    icon: MapPinned,
    title: "Every stop on the map",
    description:
      "Explore places, organize stops, and visualize your journey with Google Maps.",
  },
  {
    icon: Route,
    title: "A smarter route",
    description:
      "Organize destinations into a practical travel plan instead of juggling tabs.",
  },
];

export default function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#faf9f5] text-[#1e3329]">
      {/* Navbar */}
      <header className="relative z-10 border-b border-[#e8e7de]">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8"
        >
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#214b37] text-white">
              <Compass size={23} />
            </span>
            <span className="text-xl font-bold tracking-tight">
              Next<span className="text-[#db8457]">Trip</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-damion text-[#66736a] md:flex">
            <Link href="#discover" className="transition hover:text-[#214b37]">
              Discover
            </Link>
            <Link href="#features" className="transition hover:text-[#214b37]">
              Features
            </Link>
            <Link href="#about" className="transition hover:text-[#214b37]">
              About
            </Link>
            <button className="transition hover:text-[#214b37]" onClick={() => logIn()}>
              Sign in
            </button>

            <button className="transition hover:text-[#DC143C]" onClick={() => logOut()}>
              Log Out
            </button>
          </div>

          <Link
            href="/plan"
            className="inline-flex items-center gap-2 rounded-full bg-[#214b37] px-5 py-3 text-sm font-damion text-white transition hover:bg-[#173626]"
          >
            Plan a trip <ArrowRight size={16} />
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dfe5d9] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#52745c]">
            <Globe2 size={15} />
            Your world, your itinerary
          </div>

          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Less planning.
            <br />
            <span className="font-serif italic font-normal text-[#d88357]">
              More exploring.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-[#6d776e] md:text-lg">
            Turn your travel ideas into journeys worth remembering. Discover
            places, map your route, and bring every part of your next adventure
            together in one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/plan"
              className="inline-flex items-center gap-3 rounded-full bg-[#214b37] px-7 py-4 font-damion text-white shadow-lg shadow-[#214b37]/10 transition hover:-translate-y-0.5 hover:bg-[#173626]"
            >
              Start your journey <ArrowRight size={18} />
            </Link>

            <Link
              href="#discover"
              className="inline-flex items-center gap-2 rounded-full px-5 py-4 font-semibold text-[#526357] transition hover:bg-[#eeefe7]"
            >
              Explore ideas <ArrowDownRight size={18} />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#e6e5dc] pt-6 text-sm text-[#758076]">
            <span className="inline-flex items-center gap-2">
              <MapPin size={17} className="text-[#d88357]" />
              Discover new places
            </span>
            <span className="inline-flex items-center gap-2">
              <Route size={17} className="text-[#d88357]" />
              Plan your route
            </span>
          </div>
        </div>

        {/* Hero destination image */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div
            className="relative min-h-[430px] overflow-hidden rounded-[2rem] bg-cover bg-center shadow-2xl shadow-[#304332]/10 sm:min-h-[530px]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, transparent 42%, rgba(15,36,27,.72) 100%), url('/hero.jpg')"
            }}
          >
            <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-xs font-semibold text-[#214b37] backdrop-blur-md sm:left-7 sm:top-7">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#d88357]" />
              Your next adventure starts here
            </div>

            <div className="absolute inset-x-6 bottom-7 text-white sm:inset-x-8 sm:bottom-9">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Featured destination
              </p>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Somewhere
                <br />
                beautiful.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                Find the places that make you want to take the longer way home.
              </p>
            </div>
          </div>


        </div>
      </section>

      {/* Trip search */}
      <section className="relative z-[1] mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-8">
        <div className="rounded-[1.75rem] border border-[#e8e7de] bg-white p-5 shadow-xl shadow-[#2c4733]/5 md:p-7">
          <div className="mb-5">
            <p className="text-lg font-semibold">Where will you go next?</p>
            <p className="mt-1 text-sm text-[#7c857b]">
              Start with a destination. The rest comes together from there.
            </p>
          </div>

          <form
            action="/plan"
            method="GET"
            className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-end"
          >
            <div>
              <label
                htmlFor="destination"
                className="mb-2 block text-sm font-semibold"
              >
                Destination
              </label>
              <div className="flex h-14 items-center gap-3 rounded-xl border border-[#e7e8df] bg-[#fafaf7] px-4 transition focus-within:border-[#71927a]">
                <MapPin size={19} className="shrink-0 text-[#d88357]" />
                <input
                  id="destination"
                  name="destination"
                  type="text"
                  placeholder="City, country, or region"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9ca298]"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="startDate"
                className="mb-2 block text-sm font-semibold"
              >
                Starting date
              </label>
              <div className="flex h-14 items-center gap-3 rounded-xl border border-[#e7e8df] bg-[#fafaf7] px-4 transition focus-within:border-[#71927a]">
                <CalendarDays
                  size={19}
                  className="shrink-0 text-[#d88357]"
                />
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  className="min-w-0 w-full bg-transparent text-sm text-[#59665b] outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="travelStyle"
                className="mb-2 block text-sm font-semibold"
              >
                Travel style
              </label>
              <div className="flex h-14 items-center rounded-xl border border-[#e7e8df] bg-[#fafaf7] px-4 transition focus-within:border-[#71927a]">
                <select
                  id="travelStyle"
                  name="travelStyle"
                  defaultValue="balanced"
                  className="w-full bg-transparent text-sm text-[#59665b] outline-none"
                >
                  <option value="balanced">A bit of everything</option>
                  <option value="adventure">Adventure</option>
                  <option value="relaxation">Relaxation</option>
                  <option value="culture">Culture & history</option>
                  <option value="food">Food & cafes</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#214b37] px-7 font-semibold text-white transition hover:bg-[#173626]"
            >
              Plan my trip <ArrowRight size={17} />
            </button>
          </form>
        </div>
      </section>

      {/* Featured destinations */}
      <section id="discover" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d88357]">
              A little inspiration
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Places worth the journey.
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-[#778076]">
              From quiet mountain escapes to colorful coastal towns, find a
              destination that feels like you.
            </p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 self-start font-semibold text-[#31583e] transition hover:text-[#d88357] sm:self-auto"
          >
            Discover destinations <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article
              key={destination.name}
              className="group overflow-hidden rounded-[1.5rem] border border-[#e9e7df] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#304332]/10"
            >
              <div className="relative h-64 overflow-hidden">
                <div
                  role="img"
                  aria-label={destination.name}
                  className="h-full w-full bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${destination.image}')`,
                  }}
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-[#31583e] backdrop-blur">
                  {destination.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {destination.name}
                    </h3>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-[#7b857a]">
                      <MapPin size={15} />
                      {destination.location}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-[#f1f3ec] px-3 py-2 text-xs font-semibold text-[#52745c]">
                    {destination.duration}
                  </span>
                </div>
                <Link
                  href={`/plan?destination=${encodeURIComponent(destination.location)}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#31583e] transition hover:text-[#d88357]"
                >
                  Plan this trip <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[#edf0e7]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d88357]">
              Travel, made simpler
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need. One journey.
            </h2>
            <p className="mt-4 leading-7 text-[#6f7b6f]">
              Spend less time switching between apps and more time deciding
              what makes a trip memorable.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-[#dfe4d8] bg-white/75 p-6 transition hover:bg-white"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#214b37] text-white">
                  <Icon size={23} />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#758075]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom call to action */}
      <section id="about" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#214b37] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-2 -top-14 h-52 w-52 rounded-full border border-white/10" />

          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8bd9e]">
              Your next chapter awaits
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              The world is bigger
              <br className="hidden sm:block" /> than your itinerary.
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-white/70">
              Find your destination, build your route, and make room for the
              unexpected.
            </p>
            <Link
              href="/plan"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f4c6a5] px-7 py-4 font-semibold text-[#21402e] transition hover:bg-white"
            >
              Create your first trip <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e7de]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-sm text-[#7a8379] sm:flex-row sm:items-center sm:justify-between md:px-8">
          <Link href="/" className="font-bold text-[#214b37]">
            roam<span className="text-[#d88357]">wise</span>
          </Link>
          <p>Made for the journeys that stay with you.</p>
          <p>Roamwise</p>
        </div>
      </footer>
    </main>
  );
}
