"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowDown, Calendar, MapPin, Building, CheckCircle2, Download, ClipboardPenLine } from "lucide-react";

interface TripData {
  id: string;
  destination: string;
  stay?: string;
  startDate?: string;
  endDate?: string;
}

interface TripSummaryProps {
  tripId?: string;
}

export default function TripSummary({ tripId }: TripSummaryProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const [trip, setTrip] = useState<TripData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasVisitedFooter, setHasVisitedFooter] = useState(false);

  // Observe when the footer is fully in view (threshold: 1.0)
  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl || hasVisitedFooter || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasVisitedFooter(true);
          observer.disconnect();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, [hasVisitedFooter, isLoading]);

  const handleScrollToFooter = () => {
    setHasVisitedFooter(true);
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!tripId) {
      setError("No active trip session found.");
      setIsLoading(false);
      return;
    }

    async function fetchTripDetails() {
      try {
        const res = await fetch(`/api/trips?tripId=${tripId}`);
        const data = await res.json();
        if (data.success && data.trip) {
          setTrip(data.trip);
        } else {
          setError("Could not retrieve trip details.");
        }
      } catch (err) {
        console.error("Failed to load trip summary:", err);
        setError("An error occurred while fetching your trip summary.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTripDetails();
  }, [tripId]);

  const handleDownloadPng = async () => {
    if (!cardRef.current || !trip) return;

    setIsDownloading(true);
    try {
      const htmlToImage = await import("html-to-image");
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      const safeDestination = (trip.destination || "trip")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      link.download = `nexttrip-${safeDestination}-summary.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate PNG:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#1e3329] border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">Loading your trip summary...</p>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50">
        <div className="max-w-xl mx-auto my-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-200 text-center space-y-4">
          <p className="text-slate-800 font-semibold">{error || "Trip not found."}</p>
          <Link
            href="/plan"
            className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-5 py-2.5 text-xs font-damion text-white transition-all duration-200 hover:bg-white hover:text-black"
          >
            <ArrowLeft size={16} /> Plan a New Trip
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50/50 relative">
      <div className="max-w-3xl w-full mx-auto p-4 sm:p-6 space-y-6 my-auto">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-[#1e3329]/10 text-[#1e3329] rounded-full mb-1">
            <ClipboardPenLine size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-notoSerifBalinese text-slate-900 tracking-tight">
            Your Trip Summary
          </h1>
          <p className="text-sm text-slate-500 font-notoSerifBalinese">
            Review your selected destination, hotel accommodation, and schedule below.
          </p>
        </div>

        {/* Summary Card (Captured in PNG) */}
        <div
          ref={cardRef}
          className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="text-xs text-slate-800 font-mono">
              Trip id: {trip.id.slice(0, 8).toUpperCase()}
            </span>
          </div>

          {/* Destination Section */}
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
            <div className="p-3 rounded-xl bg-slate-100 text-[#1e3329] shrink-0">
              <MapPin size={22} />
            </div>
            <div>
              <span className="block text-xs font-notoSerifBalinese tracking-wider text-slate-800 uppercase">
                Destination
              </span>
              <h2 className="text-lg font-notoSerifBalinese text-slate-900 mt-0.5">
                {trip.destination || "Not specified"}
              </h2>
            </div>
          </div>

          {/* Hotel Accommodation Section */}
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
            <div className="p-3 rounded-xl bg-slate-100 text-[#1e3329] shrink-0">
              <Building size={22} />
            </div>
            <div>
              <span className="block text-xs font-notoSerifBalinese tracking-wider text-slate-800 uppercase">
                Selected Hotel
              </span>
              <h2 className="text-lg font-notoSerifBalinese text-slate-900 mt-0.5">
                {trip.stay || "No hotel selected yet"}
              </h2>
            </div>
          </div>

          {/* Dates Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-2.5 rounded-lg bg-white text-[#1e3329] shadow-sm shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <span className="block text-xs font-notoSerifBalinese tracking-wider text-slate-800 uppercase">
                  Check-In Date
                </span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {trip.startDate
                    ? new Date(trip.startDate).toLocaleDateString(undefined, {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Not set"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-2.5 rounded-lg bg-white text-[#1e3329] shadow-sm shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <span className="block text-xs font-notoSerifBalinese tracking-wider text-slate-800 uppercase">
                  Check-Out Date
                </span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {trip.endDate
                    ? new Date(trip.endDate).toLocaleDateString(undefined, {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Not set"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            disabled={isDownloading}
            onClick={handleDownloadPng}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1e3329] bg-white px-6 py-3 text-xs font-damion text-[#1e3329] transition-all duration-200 hover:bg-[#D3D3D3] hover:text-black cursor-pointer shadow-sm disabled:opacity-50"
          >
            <Download size={15} />
            {isDownloading ? "Generating PNG..." : "Download Summary PNG"}
          </button>

          <button
            type="button"
            onClick={() => router.push(`/hotels?tripId=${tripId}`)}
            className="inline-flex items-center justify-center rounded-full border border-black bg-black px-6 py-3 text-xs font-damion text-white transition-all duration-200 hover:bg-white hover:text-black cursor-pointer shadow-sm"
          >
            Modify Hotel or Dates
          </button>
        </div>
      </div>

      {/* Floating Scroll-to-Footer Down Arrow */}
      {!hasVisitedFooter && (
        <button
          type="button"
          onClick={handleScrollToFooter}
          aria-label="Scroll to footer"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 inline-flex items-center justify-center rounded-full border border-black bg-black p-3 text-white transition-all duration-200 hover:bg-white hover:text-black cursor-pointer shadow-md animate-bounce"
        >
          <ArrowDown size={18} />
        </button>
      )}

      {/* Footer */}
      <footer ref={footerRef} className="mt-12 border-t border-[#e8e7de] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-20 w-38 items-center justify-center overflow-hidden">
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
            className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-5 py-3 text-sm font-damion text-white transition-all duration-200 hover:bg-white hover:text-black"
          >
            <ArrowLeft size={16} /> Plan another trip
          </Link>
        </div>
      </footer>
    </div>
  );
}