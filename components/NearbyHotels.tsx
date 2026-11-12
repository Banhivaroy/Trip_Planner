"use client";

import React, { useState, useMemo } from "react";


// --- Types ---
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

// --- Mock Data ---
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
  // Search Form State
  const [location, setLocation] = useState("Current Location");
  const [checkIn, setCheckIn] = useState("2026-11-15");
  const [checkOut, setCheckOut] = useState("2026-11-18");
  const [guests, setGuests] = useState(2);

  // Filter & Sort State
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"distance" | "price" | "rating">("distance");
  const [isLocating, setIsLocating] = useState(false);

  // Use Browser Geolocation
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

  // Toggle Amenity Chip
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Filtered and Sorted Results
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Search Bar Card */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Location Input */}
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Destination or Landmark
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where are you going?"
                className="w-full rounded-xl border border-slate-300 pl-3 pr-10 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                title="Use my current location"
                className="absolute right-2.5 text-slate-400 hover:text-blue-600 transition"
              >
                {isLocating ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
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
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Check-In
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Check-Out */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Check-Out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Guests */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 bg-white focus:border-blue-600 focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2">
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition shadow-sm"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters & Sorting Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          {/* Amenity Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500 mr-1">Filters:</span>
            {AMENITY_FILTERS.map((amenity) => {
              const active = selectedAmenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {amenity}
                </button>
              );
            })}
          </div>

          {/* Max Price & Sort */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <label htmlFor="price-range" className="text-xs text-slate-600 font-medium">
                Max: <span className="text-slate-900 font-bold">${maxPrice}</span>
              </label>
              <input
                id="price-range"
                type="range"
                min={50}
                max={300}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-blue-600 cursor-pointer"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "distance" | "price" | "rating")}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white focus:outline-none"
            >
              <option value="distance">Sort: Nearest First</option>
              <option value="price">Sort: Lowest Price</option>
              <option value="rating">Sort: Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">
          {filteredHotels.length} {filteredHotels.length === 1 ? "Hotel" : "Hotels"} near{" "}
          <span className="text-blue-600">{location}</span>
        </h2>
      </div>

      {/* Hotel Cards Grid */}
      {filteredHotels.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-600 font-medium">No hotels match your selected filters.</p>
          <button
            type="button"
            onClick={() => {
              setMaxPrice(300);
              setSelectedAmenities([]);
            }}
            className="mt-2 text-sm text-blue-600 font-semibold hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col sm:flex-row"
            >
              {/* Image */}
              <div className="relative sm:w-48 h-48 sm:h-auto shrink-0 overflow-hidden bg-slate-200">
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

              {/* Content */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {hotel.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {hotel.neighborhood} • <span className="font-medium text-slate-700">{hotel.distanceKm} km away</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-bold shrink-0">
                      <span>★ {hotel.rating}</span>
                      <span className="text-blue-400 font-normal">({hotel.reviewCount})</span>
                    </div>
                  </div>

                  {/* Amenities */}
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

                {/* Price & Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <span className="text-xl font-extrabold text-slate-900">
                      ${hotel.pricePerNight}
                    </span>
                    <span className="text-xs text-slate-500"> / night</span>
                  </div>
                  <button
                    type="button"
                    className="bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                  >
                    View Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}