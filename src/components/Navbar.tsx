"use client";
import Link from 'next/link'
import React from 'react'
import { BrainCircuit } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu';
import { UserButton, useUser } from '@clerk/nextjs';
import { Button } from './ui/button';
import ThemeToggle  from "./ui/theme-toggle"

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="
      sticky top-0 left-0 w-full z-50 p-5
      bg-black/80 backdrop-blur-md border-b border-gray-700
      flex items-center shadow-md
    ">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        
        {/* Logo */}

        <Link href="/" className="flex items-center">
          <BrainCircuit className="text-white animate-pulse mr-3 h-8 w-8" />
          <span className="font-sans text-white font-bold text-2xl">Mind</span>
          <span className="text-2xl font-sans font-bold animate-pulse text-cyan-400">Flow</span>
        </Link> 
  
        {isSignedIn ? (
          <div className="flex items-center gap-6">
            {/* Menu */}
            <NavigationMenu>
              <NavigationMenuList className="flex gap-4 text-white">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/dashboard', label: 'Neural Dashboard' },
                  { href: '/main', label: 'Quantum Analysis' },
                  { href: '/settings', label: 'Bio Settings' },
                  { href: '/therapy', label: 'Therapist' },
                  { href: '/contact', label: 'Contact' },
                ].map(({ href, label }) => (
                  <NavigationMenuItem key={href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
                        className="px-3 py-1 rounded hover:text-black hover:bg-cyan-400 transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <UserButton/>
            
            <div className="flex items-center gap-3">
              <ThemeToggle/>
            </div>

          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button className="bg-cyan-500 text-black hover:bg-gray-700 hover:text-white">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button className="bg-cyan-500 text-black hover:bg-gray-700 hover:text-white">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
