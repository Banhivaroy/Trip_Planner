"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { logIn, logOut } from "@/lib/auth-actions";
import { Session } from "next-auth";

export default function Navbar({ session }: { session: Session | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 border-b border-[#e8e7de] bg-white/95 backdrop-blur-sm">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5 sm:py-5 md:px-8"
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center overflow-hidden">
            <Image
              src="/logo.png"
              alt="NextTrip Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 text-sm font-kalam text-[#66736a] md:flex">
          {session ? (
            <>
              <Link href="#about" className="transition hover:text-[#214b37]">
                About
              </Link>
              <button
                className="transition hover:text-[#DC143C] cursor-pointer"
                onClick={() => logOut()}
              >
                Log Out
              </button>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-5 py-3 text-sm font-damion text-white transition-all duration-200 hover:bg-white hover:text-black"
              >
                Plan a trip <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <button
              className="rounded-full border border-[#1e3329] px-5 py-2.5 transition hover:bg-[#1e3329] hover:text-white cursor-pointer"
              onClick={() => logIn()}
            >
              Sign in
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="inline-flex items-center justify-center rounded-xl border border-[#e8e7de] p-2.5 text-[#1e3329] transition hover:bg-slate-100 md:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#e8e7de] bg-white px-5 py-5 flex flex-col gap-4 text-base font-kalam text-[#66736a] md:hidden shadow-lg">
          {session ? (
            <>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 transition hover:text-[#214b37]"
              >
                About
              </Link>
              <button
                className="py-1.5 text-left transition hover:text-[#DC143C]"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logOut();
                }}
              >
                Log Out
              </button>
              <Link
                href="/plan"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full border border-black bg-black px-5 py-3.5 text-sm font-damion text-white transition-all duration-200 hover:bg-white hover:text-black"
              >
                Plan a trip <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <button
              className="w-full rounded-full border border-black bg-black px-5 py-3 text-center text-sm font-damion text-white transition hover:bg-white hover:text-black"
              onClick={() => {
                setMobileMenuOpen(false);
                logIn();
              }}
            >
              Sign in
            </button>
          )}
        </div>
      )}
    </header>
  );
}