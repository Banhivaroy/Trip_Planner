
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Check,
  Compass,
  MapPin,
  Sparkles,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

type TripDetails = {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  style: string;
  budget: string;
  interests: string[];
};

type Stage = {
  number: string;
  title: string;
  description: string;
  side: "left" | "right";
  x: number;
  y: number;
  icon: LucideIcon;
};

const STAGES: Stage[] = [
  {
    number: "01",
    title: "Choose your destination",
    description:
      "Every great journey starts somewhere. Pick the place you cannot wait to explore.",
    side: "left",
    x: 80,
    y: 170,
    icon: MapPin,
  },
  {
    number: "02",
    title: "Set your dates",
    description:
      "Choose when your adventure begins and how long you want to stay.",
    side: "right",
    x: 920,
    y: 510,
    icon: CalendarDays,
  },
  {
    number: "03",
    title: "Who's coming along?",
    description:
      "Plan a solo escape, a romantic getaway, or a memorable group adventure.",
    side: "left",
    x: 80,
    y: 850,
    icon: Users,
  },
  {
    number: "04",
    title: "Find your travel style",
    description:
      "Slow mornings, hidden trails, local culture, or a little bit of everything.",
    side: "right",
    x: 920,
    y: 1190,
    icon: Compass,
  },
  {
    number: "05",
    title: "Set your budget",
    description:
      "Choose a spending style that feels right for the journey ahead.",
    side: "left",
    x: 80,
    y: 1530,
    icon: Wallet,
  },
  {
    number: "06",
    title: "Pick your experiences",
    description:
      "Tell us what excites you, from beautiful landscapes to unforgettable food.",
    side: "right",
    x: 920,
    y: 1870,
    icon: Sparkles,
  },
  {
    number: "07",
    title: "Ready for the road",
    description:
      "Review your choices and get ready to turn your ideas into an itinerary.",
    side: "left",
    x: 80,
    y: 2210,
    icon: Check,
  },
];

const ROUTE_PATH = `
  M 80 170
  C 90 300, 430 350, 740 455
  C 835 485, 910 470, 920 510
  C 900 635, 490 730, 150 810
  C 95 830, 55 820, 80 850
  C 180 970, 620 1095, 850 1150
  C 910 1170, 950 1155, 920 1190
  C 850 1330, 430 1420, 140 1495
  C 90 1510, 55 1510, 80 1530
  C 190 1665, 630 1775, 860 1835
  C 920 1855, 950 1845, 920 1870
  C 820 2020, 360 2140, 80 2210
`;

const INTEREST_OPTIONS = [
  "Nature",
  "Food & cafes",
  "History",
  "Adventure",
  "Photography",
  "Shopping",
  "Beaches",
];

const STYLE_LABELS: Record<string, string> = {
  balanced: "A bit of everything",
  relaxed: "Slow & relaxed",
  adventure: "Adventure",
  culture: "Culture & history",
  foodie: "Food & cafes",
};

const BUDGET_LABELS: Record<string, string> = {
  budget: "Budget-friendly",
  comfortable: "Comfortable",
  premium: "Premium experience",
};

const FIELD_CLASS =
  "w-full rounded-xl border border-[#ead7d1] bg-white/90 px-3 py-2.5 text-sm text-[#433630] outline-none transition placeholder:text-[#b5a6a0] focus:border-[#ce8aa4] focus:ring-2 focus:ring-[#e9c2d0]/40";

const LABEL_CLASS =
  "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.13em] text-[#947773]";

export default function Plan() {
  const [activeStep, setActiveStep] = useState(0);
  const [planReady, setPlanReady] = useState(false);

  const [trip, setTrip] = useState<TripDetails>({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "2",
    style: "balanced",
    budget: "comfortable",
    interests: [],
  });

  // Prefill the destination when arriving from a search link such as
  // /plan?destination=Kyoto%2C%20Japan
  useEffect(() => {
    const destination = new URLSearchParams(
      window.location.search
    ).get("destination");

    if (destination) {
      setTrip((current) => ({ ...current, destination }));
    }
  }, []);

  function updateTrip<K extends keyof TripDetails>(
    key: K,
    value: TripDetails[K]
  ) {
    setTrip((current) => ({ ...current, [key]: value }));
    setPlanReady(false);
  }

  function toggleInterest(interest: string) {
    const updated = trip.interests.includes(interest)
      ? trip.interests.filter((item) => item !== interest)
      : [...trip.interests, interest];

    updateTrip("interests", updated);
  }

  function goToStage(index: number) {
    const nextIndex = Math.max(
      0,
      Math.min(index, STAGES.length - 1)
    );

    setActiveStep(nextIndex);
    setPlanReady(false);

    document
      .getElementById(`stage-${nextIndex}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleStageAction(index: number) {
    if (index !== activeStep) {
      goToStage(index);
      return;
    }

    if (index < STAGES.length - 1) {
      goToStage(index + 1);
      return;
    }

    // This is a local preview for now; connect it to your API
    // when you are ready to save trips to PostgreSQL.
    setPlanReady(true);
  }

  const currentStop = STAGES[activeStep];
  const progressOffset =
    1000 - (activeStep / (STAGES.length - 1)) * 1000;

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffdf9] text-[#292521]">
      {/* Header */}
      <header className="relative z-40 border-b border-[#eddfd8] bg-[#fffdf9]/90 backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8"
        >
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d987a7] to-[#d9b66e] text-white shadow-sm">
              <Compass size={21} />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              roam<span className="text-[#c77f91]">wise</span>
            </span>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-[#ead9d1] px-4 py-2 text-sm font-medium text-[#806b62] transition hover:border-[#cf9b9b] hover:text-[#bd718c]"
          >
            Exit planner
          </Link>
        </nav>
      </header>

      {/* Intro */}
      <section className="relative mx-auto max-w-7xl px-5 pb-10 pt-14 md:px-8 md:pb-14 md:pt-20">
        <div className="pointer-events-none absolute right-[-80px] top-2 h-64 w-64 rounded-full bg-[#efd5da]/30 blur-3xl" />
        <div className="pointer-events-none absolute left-[30%] top-20 h-48 w-48 rounded-full bg-[#f3e4c6]/35 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#edd9d5] bg-white/80 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ab7e78]">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#d783a6] to-[#d9b66e]" />
            Your journey begins here
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-medium leading-[1.12] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Plot your path.
            <br />
            <span className="bg-gradient-to-r from-[#c86f99] via-[#c78d86] to-[#c6a45e] bg-clip-text font-serif italic text-transparent">
              Chase the unknown.
            </span>
          </h1>

          <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <p className="max-w-xl text-sm leading-7 text-[#82746d] sm:text-base">
              Seven little stops between you and your next big adventure.
              Choose your destination, shape your journey, and let the road
              lead you to something wonderful.
            </p>

            <div className="w-full max-w-[230px]">
              <div className="mb-2 flex items-center justify-between text-xs text-[#947b72]">
                <span>Journey progress</span>
                <span className="font-semibold text-[#ba7e8a]">
                  {activeStep + 1} / {STAGES.length}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#f0e4de]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#dc8bad] via-[#d4a18b] to-[#d8bd75] transition-all duration-700"
                  style={{
                    width: `${((activeStep + 1) / STAGES.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The winding road */}
      <section
        aria-label="Trip planning stages"
        className="relative mx-auto max-w-[1600px] px-2 sm:px-5 md:px-8"
      >
        <div className="relative h-[2380px]">
          {/* Desktop curved road */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 2380"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
          >
            <defs>
              <linearGradient
                id="roadGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#dc8cb5" />
                <stop offset="42%" stopColor="#d79caa" />
                <stop offset="72%" stopColor="#d8b38c" />
                <stop offset="100%" stopColor="#e0c87f" />
              </linearGradient>
            </defs>

            {/* Road bed */}
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke="#f3e5df"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Pink-to-gold road */}
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke="url(#roadGradient)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />

            {/* Center road markings */}
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke="#fffaf5"
              strokeWidth="2.5"
              strokeDasharray="2 16"
              strokeLinecap="round"
              opacity="0.95"
            />

            {/* Progress travelled by the car */}
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke="url(#roadGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              pathLength={1000}
              strokeDasharray="1000"
              strokeDashoffset={progressOffset}
              style={{
                transition: "stroke-dashoffset 900ms ease-in-out",
              }}
            />

            {/* The seven stops */}
            {STAGES.map((stage, index) => (
              <g key={stage.number}>
                <circle
                  cx={stage.x}
                  cy={stage.y}
                  r="10"
                  fill="#fffdf9"
                  stroke="url(#roadGradient)"
                  strokeWidth="5"
                />
                <circle
                  cx={stage.x}
                  cy={stage.y}
                  r="3"
                  fill={index <= activeStep ? "#c9829b" : "#dbc7bb"}
                />
              </g>
            ))}
          </svg>

          {/* Mobile road */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[170px] left-[19px] top-[170px] w-[5px] rounded-full bg-gradient-to-b from-[#dc8cb5] via-[#d79caa] to-[#e0c87f] md:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[170px] left-[20px] top-[170px] w-[2px] md:hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255,253,249,.95) 0 3px, transparent 3px 16px)",
            }}
          />

          {/* Planning stages */}
          {STAGES.map((stage, index) => {
            const StageIcon = stage.icon;
            const isActive = activeStep === index;
            const isComplete = index < activeStep;
            const isFinalStage = index === STAGES.length - 1;

            return (
              <article
                id={`stage-${index}`}
                key={stage.number}
                className={`relative grid h-[340px] grid-cols-[44px_minmax(0,1fr)] items-center md:grid-cols-2 ${
                  isActive ? "z-10" : "z-0"
                }`}
              >
                {/* Mobile road stop */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[11px] top-1/2 z-20 h-5 w-5 -translate-y-1/2 rounded-full border-[4px] border-[#fffdf9] ring-2 transition-colors md:hidden ${
                    isActive
                      ? "bg-[#d18ba3] ring-[#e5c1b9]"
                      : isComplete
                        ? "bg-[#d5a38f] ring-[#ead7c9]"
                        : "bg-[#dccdc4] ring-[#f0e5df]"
                  }`}
                />

                {/* Stage content: alternates left and right on desktop */}
                <div
                  className={`col-span-2 grid grid-cols-[55px_minmax(0,1fr)] items-center gap-2 pl-12 pr-3 sm:gap-3 md:col-span-1 md:grid-cols-[82px_minmax(0,1fr)] md:gap-4 ${
                    stage.side === "left"
                      ? "md:col-start-1 md:pl-[18%] md:pr-3"
                      : "md:col-start-2 md:pl-3 md:pr-[16%]"
                  }`}
                >
                  {/* Oversized stage number */}
                  <div
                    className={`select-none text-6xl font-light leading-none tracking-[-0.09em] sm:text-7xl md:text-8xl ${
                      isActive ? "text-[#28231f]" : "text-[#c9bdb6]"
                    }`}
                    aria-hidden="true"
                  >
                    {Number(stage.number)}
                  </div>

                  {/* Stage details */}
                  <div
                    className={`min-w-0 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-[#fffaf6]/95 p-3 shadow-[0_12px_32px_-25px_rgba(143,89,83,0.45)] ring-1 ring-[#ead7cf] sm:p-4"
                        : "p-3 sm:p-4"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#f0dce2] to-[#f2e8cf] text-[#aa7185]">
                        <StageIcon size={15} />
                      </span>

                      <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#a28b81]">
                        Stop {stage.number}
                      </span>

                      {isActive && (
                        <span className="rounded-full bg-[#f5e7e8] px-2 py-1 text-[9px] font-semibold text-[#b46f88]">
                          Current stop
                        </span>
                      )}
                    </div>

                    <h2 className="mt-2 bg-gradient-to-r from-[#bd668f] via-[#c38a83] to-[#bc9b5b] bg-clip-text font-serif text-2xl leading-tight tracking-[-0.035em] text-transparent sm:text-3xl lg:text-4xl">
                      {stage.title}
                    </h2>

                    <div className="mt-2 h-px w-3/4 bg-gradient-to-r from-[#d989ac] via-[#d5aaa0] to-transparent" />

                    <p className="mt-2 text-xs leading-5 text-[#81736c] sm:text-sm sm:leading-6">
                      {stage.description}
                    </p>

                    {/* Stage 1: Destination */}
                    {index === 0 && (
                      <div className="mt-3">
                        <label htmlFor="destination" className={LABEL_CLASS}>
                          Where to?
                        </label>
                        <div className="relative">
                          <MapPin
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c38b91]"
                          />
                          <input
                            id="destination"
                            type="text"
                            autoComplete="off"
                            placeholder="e.g. Kyoto, Japan"
                            value={trip.destination}
                            onChange={(event) =>
                              updateTrip("destination", event.target.value)
                            }
                            className={`${FIELD_CLASS} pl-9`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Stage 2: Dates */}
                    {index === 1 && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="min-w-0">
                          <label htmlFor="startDate" className={LABEL_CLASS}>
                            Start date
                          </label>
                          <input
                            id="startDate"
                            type="date"
                            value={trip.startDate}
                            onChange={(event) =>
                              updateTrip("startDate", event.target.value)
                            }
                            className={FIELD_CLASS}
                          />
                        </div>
                        <div className="min-w-0">
                          <label htmlFor="endDate" className={LABEL_CLASS}>
                            End date
                          </label>
                          <input
                            id="endDate"
                            type="date"
                            min={trip.startDate || undefined}
                            value={trip.endDate}
                            onChange={(event) =>
                              updateTrip("endDate", event.target.value)
                            }
                            className={FIELD_CLASS}
                          />
                        </div>
                      </div>
                    )}

                    {/* Stage 3: Travellers */}
                    {index === 2 && (
                      <div className="mt-3">
                        <label htmlFor="travelers" className={LABEL_CLASS}>
                          Number of travellers
                        </label>
                        <select
                          id="travelers"
                          value={trip.travelers}
                          onChange={(event) =>
                            updateTrip("travelers", event.target.value)
                          }
                          className={FIELD_CLASS}
                        >
                          <option value="1">Just me</option>
                          <option value="2">2 travellers</option>
                          <option value="3–4">3–4 travellers</option>
                          <option value="5–8">5–8 travellers</option>
                          <option value="9+">9+ travellers</option>
                        </select>
                      </div>
                    )}

                    {/* Stage 4: Travel style */}
                    {index === 3 && (
                      <div className="mt-3">
                        <label htmlFor="style" className={LABEL_CLASS}>
                          Your kind of journey
                        </label>
                        <select
                          id="style"
                          value={trip.style}
                          onChange={(event) =>
                            updateTrip("style", event.target.value)
                          }
                          className={FIELD_CLASS}
                        >
                          <option value="balanced">A bit of everything</option>
                          <option value="relaxed">Slow & relaxed</option>
                          <option value="adventure">Adventure & outdoors</option>
                          <option value="culture">Culture & history</option>
                          <option value="foodie">Food & cafes</option>
                        </select>
                      </div>
                    )}

                    {/* Stage 5: Budget */}
                    {index === 4 && (
                      <div className="mt-3">
                        <label htmlFor="budget" className={LABEL_CLASS}>
                          Spending preference
                        </label>
                        <select
                          id="budget"
                          value={trip.budget}
                          onChange={(event) =>
                            updateTrip("budget", event.target.value)
                          }
                          className={FIELD_CLASS}
                        >
                          <option value="budget">Budget-friendly</option>
                          <option value="comfortable">Comfortable</option>
                          <option value="premium">Premium experience</option>
                        </select>
                      </div>
                    )}

                    {/* Stage 6: Interests */}
                    {index === 5 && (
                      <div className="mt-3">
                        <p className={LABEL_CLASS}>
                          Pick everything you love
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {INTEREST_OPTIONS.map((interest) => {
                            const selected =
                              trip.interests.includes(interest);

                            return (
                              <button
                                key={interest}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => toggleInterest(interest)}
                                className={`rounded-full border px-2.5 py-1.5 text-[10px] font-medium transition sm:text-xs ${
                                  selected
                                    ? "border-transparent bg-gradient-to-r from-[#df9bb8] to-[#ddc18b] text-white"
                                    : "border-[#eadbd3] bg-white text-[#806e65] hover:border-[#d8a1ac]"
                                }`}
                              >
                                {interest}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Stage 7: Review */}
                    {index === 6 && (
                      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 rounded-xl border border-[#f0e1d8] bg-white/80 p-3 text-xs">
                        <div className="min-w-0">
                          <p className={LABEL_CLASS}>Destination</p>
                          <p className="truncate font-medium text-[#625149]">
                            {trip.destination || "Not selected"}
                          </p>
                        </div>

                        <div>
                          <p className={LABEL_CLASS}>Travellers</p>
                          <p className="font-medium text-[#625149]">
                            {trip.travelers}
                          </p>
                        </div>

                        <div className="min-w-0">
                          <p className={LABEL_CLASS}>Dates</p>
                          <p className="break-words font-medium text-[#625149]">
                            {trip.startDate || "TBD"}
                            {" — "}
                            {trip.endDate || "TBD"}
                          </p>
                        </div>

                        <div>
                          <p className={LABEL_CLASS}>Travel style</p>
                          <p className="font-medium text-[#625149]">
                            {STYLE_LABELS[trip.style]}
                          </p>
                        </div>

                        <div>
                          <p className={LABEL_CLASS}>Budget</p>
                          <p className="font-medium text-[#625149]">
                            {BUDGET_LABELS[trip.budget]}
                          </p>
                        </div>

                        <div>
                          <p className={LABEL_CLASS}>Interests</p>
                          <p className="font-medium text-[#625149]">
                            {trip.interests.length
                              ? trip.interests.join(", ")
                              : "Not selected"}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Stage navigation */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleStageAction(index)}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ce83a4] via-[#d49a94] to-[#d5b66e] px-3.5 py-2 text-[11px] font-semibold text-white shadow-sm shadow-[#c48c8a]/15 transition hover:-translate-y-0.5 hover:shadow-md sm:text-xs"
                      >
                        {isFinalStage && isActive
                          ? "Prepare my trip"
                          : isActive
                            ? "Continue to next stop"
                            : "Drive to this stop"}

                        <ArrowRight size={14} />
                      </button>

                      {isComplete && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#a77d70]">
                          <Check size={12} />
                          Visited
                        </span>
                      )}
                    </div>

                    {isFinalStage && planReady && (
                      <div
                        role="status"
                        className="mt-3 rounded-xl border border-[#e9d8c0] bg-[#fbf3e5] p-3 text-xs leading-5 text-[#806b50]"
                      >
                        Your trip outline is ready! These details are
                        currently held in this page's state. Connect this
                        action to your Next.js API and PostgreSQL database
                        to save the trip.
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          {/* Moving car — desktop */}
          <div
            aria-label={`Car at stop ${activeStep + 1}: ${currentStop.title}`}
            className="pointer-events-none absolute z-30 hidden -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out md:block"
            style={{
              left: `${currentStop.x / 10}%`,
              top: `${(currentStop.y / 2380) * 100}%`,
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-[#d77fa5] to-[#d9b86f] text-white shadow-[0_0_0_5px_rgba(222,174,173,0.18),0_8px_24px_rgba(167,111,116,0.25)]">
              <CarFront size={23} strokeWidth={2.1} />
            </div>
          </div>

          {/* Moving car — mobile */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[21px] z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out md:hidden"
            style={{
              top: `${(currentStop.y / 2380) * 100}%`,
            }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-[#d77fa5] to-[#d9b86f] text-white shadow-[0_0_0_4px_rgba(222,174,173,0.2),0_8px_20px_rgba(167,111,116,0.2)]">
              <CarFront size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom section */}
      <footer className="border-t border-[#eee0d9] bg-[#fcf7f1]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-[#907b70] sm:flex-row sm:items-center sm:justify-between md:px-8">
          <Link href="/" className="font-semibold text-[#756056]">
            roam<span className="text-[#c77f91]">wise</span>
          </Link>
          <p>Every great journey starts with one little stop.</p>
          <button
            type="button"
            onClick={() => goToStage(0)}
            className="inline-flex items-center gap-2 self-start font-medium transition hover:text-[#c47794] sm:self-auto"
          >
            Back to the beginning <ArrowRight size={15} />
          </button>
        </div>
      </footer>
    </main>
  );
}
