"use client"
import Link from "next/link";
import Image from "next/image"; // 1. Import the Image component
import { ArrowRight } from "lucide-react";
import { logIn, logOut } from "@/lib/auth-actions";
import { Session } from "next-auth";

export default function Navbar({session}:{session : Session | null}){
    return(
    <>
    <header className="relative z-10 border-b border-[#e8e7de]">
        
        <nav 
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8"
        >
          <Link href="/" className="flex items-center gap-2">
            {/* 2. Replaced the empty span with Next.js Image */}
            <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="NextTrip Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div> 
            
          </Link>

          <div className="hidden items-center gap-8 text-sm font-damion text-[#66736a] md:flex">
            {session ? (
            <>
            <Link href="#discover" className="transition hover:text-[#214b37]">
              Discover
            </Link>
            <Link href="#features" className="transition hover:text-[#214b37]">
              Features
            </Link>
            <Link href="#about" className="transition hover:text-[#214b37]">
              About
            </Link>
             <button className="transition hover:text-[#DC143C]" onClick={() => logOut()}>
              Log Out
            </button>
             </>
            ) : (
              <button className="transition hover:text-[#214b37]" onClick={() => logIn()}>
              Sign in
            </button>
            )}
          </div>

          <Link
            href="/plan"
            className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-5 py-3 text-sm font-damion text-white transition-all duration-200 hover:bg-white hover:text-black"
          >
            Plan a trip <ArrowRight size={16} />
          </Link>
        </nav>
      </header>
    </>
    )
}