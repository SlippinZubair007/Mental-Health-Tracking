import Link from 'next/link'
import React from 'react'
import { BrainCircuit } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu';

const Navbar = () => {
  return (
   <header className="sticky top-0 left-0 w-full z-50 bg-black border-b backdrop-blur-lg border-black flex items-center h-5">
    <div className="container mx-auto flex flex-wrap items-center justify-between pt-25">
    
    <Link href="/" className="flex items-center">
    <BrainCircuit className="text-white animate-pulse mr-5 h-10 w-9"/>
     <span className=" font-sans text-white font-bold text-3xl">Mind</span>
     <span className="text-3xl font-sans font-bold animate-pulse text-cyan-700">Flow</span>
     </Link>
     
     <div className="flex items-center gap-6 ">
      {/* Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap gap-3 md:gap-6  mt-4 md:mt-0 text-white ">
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
                    className="px-3 py-1 rounded hover:text-black hover:bg-cyan-500 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
     </div>
    
    </div>
   </header>
  )
}

export default Navbar
