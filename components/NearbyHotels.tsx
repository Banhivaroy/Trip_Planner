"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowDown } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  neighborhood: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  imageUrl: string;
  amenities: string[];
  tag?: string;
}

const MOCK_HOTELS: Hotel[] = [
  {
    id: "h1",
    name: "The Grand Meridian Suites",
    neighborhood: "City Center",
    distanceKm: 0.4,
    rating: 4.8,
    reviewCount: 412,
    pricePerNight: 185,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    amenities: ["Free Wi-Fi", "Pool", "Breakfast Included"],
    tag: "Top Pick",
  },
  {
    id: "h2",
    name: "Harborview Boutique Hotel",
    neighborhood: "Waterfront District",
    distanceKm: 1.2,
    rating: 4.6,
    reviewCount: 289,
    pricePerNight: 145,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    amenities: ["Free Wi-Fi", "Spa", "Pet Friendly"],
  },
  {
    id: "h3",
    name: "Urban Loft & Stay",
    neighborhood: "Arts Quarter",
    distanceKm: 1.8,
    rating: 4.3,
    reviewCount: 195,
    pricePerNight: 98,
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    amenities: ["Free Wi-Fi", "Gym"],
    tag: "Great Value",
  },
  {
    id: "h4",
    name: "The Royal Heritage Inn",
    neighborhood: "Old Town",
    distanceKm: 2.5,
    rating: 4.9,
    reviewCount: 530,
    pricePerNight: 240,
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    amenities: ["Pool", "Spa", "Breakfast Included", "Free Wi-Fi"],
  },
];

const AMENITY_FILTERS = ["Free Wi-Fi", "Pool", "Breakfast Included", "Pet Friendly"];

export default function NearbyHotelsSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tripId = searchParams.get("tripId");

  const footerRef = useRef<HTMLElement>(null);
  const [hasVisitedFooter, setHasVisitedFooter] = useState(false);

  const [location, setLocation] = useState("Loading destination...");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"distance" | "price" | "rating">("distance");
  const [isLocating, setIsLocating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasVisitedFooter) return;
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 100;

      if (scrollPosition >= threshold) {
        setHasVisitedFooter(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasVisitedFooter]);

  const handleScrollToFooter = () => {
    setHasVisitedFooter(true);
    footerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    if (!tripId) {
      setLocation("Current Location");
      return;
    }

    async function fetchTripDestination() {
      try {
        const res = await fetch(`/api/trips?tripId=${tripId}`);
        const data = await res.json();
        if (data.success && data.trip?.destination) {
          setLocation(data.trip.destination);
        } else {
          setLocation("Current Location");
        }
      } catch (err) {
        console.error("Failed to load trip destination:", err);
        setLocation("Current Location");
      }
    }

    fetchTripDestination();
  }, [tripId]);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`Near ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
        setIsLocating(false);
      },
      () => {
        setLocation("Downtown Area");
        setIsLocating(false);
      }
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSelectHotelAndDates = async (hotelName: string) => {
    if (!tripId) {
      alert("No active trip session found. Please select a destination first.");
      router.push("/");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates before selecting a hotel.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId,
          stay: hotelName,
          startDate: checkIn,
          endDate: checkOut,
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/summary?tripId=${tripId}`);
      }
    } catch (err) {
      console.error("Failed to save hotel and dates:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredHotels = useMemo(() => {
    return MOCK_HOTELS.filter((hotel) => {
      const matchesPrice = hotel.pricePerNight <= maxPrice;
      const matchesAmenities = selectedAmenities.every((amenity) =>
        hotel.amenities.includes(amenity)
      );
      return matchesPrice && matchesAmenities;
    }).sort((a, b) => {
      if (sortBy === "distance") return a.distanceKm - b.distanceKm;
      if (sortBy === "price") return a.pricePerNight - b.pricePerNight;
      return b.rating - a.rating;
    });
  }, [maxPrice, selectedAmenities, sortBy]);

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-x-hidden">
      <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
        {/* Search Bar Card */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4 items-end">
            {/* Location Input */}
            <div className="col-span-2 md:col-span-6">
              <label className="block text-base sm:text-lg font-notoSerifBalinese tracking-wider text-slate-800 mb-1">
                Destination
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where are you going?"
                  className="w-full rounded-xl border border-slate-300 pl-3 pr-10 py-2.5 text-base sm:text-sm text-slate-900 focus:border-[#1e3329] focus:outline-none focus:ring-2 focus:ring-[#1e3329]/20"
                />
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  title="Use my current location"
                  className="absolute right-2.5 p-1 text-slate-400 hover:text-[#1e3329] transition"
                >
                  {isLocating ? (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#1e3329] border-t-transparent" />
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Check-In */}
            <div className="col-span-1 md:col-span-3">
              <label className="block text-base sm:text-lg font-notoSerifBalinese tracking-wider text-slate-800 mb-1">
                Check-In
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-2.5 sm:px-3 py-2.5 text-sm text-slate-900 focus:border-[#1e3329] focus:outline-none"
              />
            </div>

            {/* Check-Out */}
            <div className="col-span-1 md:col-span-3">
              <label className="block text-base sm:text-lg font-notoSerifBalinese tracking-wider text-slate-800 mb-1">
                Check-Out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-2.5 sm:px-3 py-2.5 text-sm text-slate-900 focus:border-[#1e3329] focus:outline-none"
              />
            </div>
          </div>

          {/* Filters Bar (Horizontal scroll on mobile) */}
          <div className="mt-4 sm:mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            <span className="text-xs font-medium text-slate-500 mr-1 shrink-0">Filters:</span>
            {AMENITY_FILTERS.map((amenity) => {
              const active = selectedAmenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    active
                      ? "bg-black text-white border border-black"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {filteredHotels.length} {filteredHotels.length === 1 ? "Hotel" : "Hotels"} near{" "}
            <span className="text-[#1e3329]">{location}</span>
          </h2>
        </div>

        {/* Hotel Cards Grid */}
        {filteredHotels.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 px-4">
            <p className="text-slate-600 font-medium">No hotels match your selected filters.</p>
            <button
              type="button"
              onClick={() => {
                setMaxPrice(300);
                setSelectedAmenities([]);
              }}
              className="mt-2 text-sm text-black font-semibold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col sm:flex-row"
              >
                <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0 overflow-hidden bg-slate-200">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {hotel.tag && (
                    <span className="absolute top-3 left-3 bg-slate-900/85 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      {hotel.tag}
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base leading-snug">
                          {hotel.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {hotel.neighborhood} •{" "}
                          <span className="font-medium text-slate-700">{hotel.distanceKm} km away</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-1 rounded-lg text-xs font-bold shrink-0">
                        <span>★ {hotel.rating}</span>
                        <span className="text-amber-600 font-normal">({hotel.reviewCount})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {hotel.amenities.map((item) => (
                        <span
                          key={item}
                          className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                      <span className="text-xl font-extrabold text-slate-900">
                        ${hotel.pricePerNight}
                      </span>
                      <span className="text-xs text-slate-500"> / night</span>
                    </div>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => handleSelectHotelAndDates(hotel.name)}
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-black bg-black px-4 py-2.5 sm:py-2 text-xs font-damion text-white transition-all duration-200 hover:bg-white hover:text-black cursor-pointer shadow-sm"
                    >
                      {isSaving ? "Saving..." : "Select Hotel & Dates"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Centered Down Arrow */}
      {!hasVisitedFooter && (
        <button
          type="button"
          onClick={handleScrollToFooter}
          aria-label="Scroll to footer"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 inline-flex items-center justify-center rounded-full border border-black bg-black p-3 text-white transition-all duration-200 hover:bg-white hover:text-black cursor-pointer shadow-md animate-bounce"
        >
          <ArrowDown size={18} />
        </button>
      )}

      {/* Footer */}
      <footer ref={footerRef} className="mt-10 sm:mt-12 border-t border-[#e8e7de]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-5 sm:py-5 md:px-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative flex h-14 w-24 sm:h-20 sm:w-36 items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="NextTrip Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <Link
            href="/plan"
            className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-damion text-white transition-all duration-200 hover:bg-white hover:text-black"
          >
            <ArrowLeft size={16} /> Change destination
          </Link>
        </div>
      </footer>
    </div>
  );
}