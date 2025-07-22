"use client";
import Link from "next/link";
import React from "react";
import { BrainCircuit } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import ThemeToggle from "./ui/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Neural Dashboard" },
  { href: "/main", label: "Quantum Analysis" },
  { href: "/settings", label: "Bio Settings" },
  { href: "/therapy", label: "Therapist" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <header
      className="sticky top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-700 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <BrainCircuit className="text-white animate-pulse h-8 w-8" />
          <span className="font-sans text-white font-bold text-xl sm:text-2xl">
            Mind
          </span>
          <span className="text-xl sm:text-2xl font-sans font-bold animate-pulse text-cyan-400">
            Flow
          </span>
        </Link>

        {/* Nav links & user area */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              {/* Desktop navigation */}
              <nav className="hidden md:block">
                <NavigationMenu>
                  <NavigationMenuList className="flex gap-2 lg:gap-4 text-white">
                    {navLinks.map(({ href, label }) => (
                      <NavigationMenuItem key={href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={href}
                            className="px-3 py-2 rounded-md hover:text-black hover:bg-cyan-400 transition-colors duration-200 text-sm lg:text-base"
                          >
                            {label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <UserButton afterSignOutUrl="/" />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Button className="bg-cyan-500 text-black hover:bg-gray-700 hover:text-white text-sm sm:text-base px-3 sm:px-4">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button className="bg-cyan-500 text-black hover:bg-gray-700 hover:text-white text-sm sm:text-base px-3 sm:px-4">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
