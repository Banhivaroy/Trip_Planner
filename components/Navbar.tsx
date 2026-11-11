"use client"
import Link from "next/link";
import { Compass,ArrowRight } from "lucide-react";
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
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#214b37] text-white">
              <Compass size={23} />
            </span>
            <span className="text-xl font-bold tracking-tight">
              Next<span className="text-[#db8457]">Trip</span>
            </span>
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
            className="inline-flex items-center gap-2 rounded-full bg-[#214b37] px-5 py-3 text-sm font-damion text-white transition hover:bg-[#173626]"
          >
            Plan a trip <ArrowRight size={16} />
          </Link>
        </nav>
      </header>
    </>
    )
}