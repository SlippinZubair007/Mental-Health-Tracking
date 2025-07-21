import Link from 'next/link'
import React from 'react'
import { BrainCircuit } from 'lucide-react'

const Branding = () => {
  return (
    <div className="w-full fixed top-0 z-50 bg-background backdrop-blur text-white">
      <div className="absolute inset-0 border-b border-primary">
      <header className="relative max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
            <Link
            href="/"
            className="flex items-center gap-2 space-x-2 transition-opacity hover:opacity-80"
            >
            <BrainCircuit className="h-7 w-7 text-white  animate-pulse"/>
            <div className="flex flex-col">
                <span className="text-xl font-bold font-sans bg-clip-text">Hush</span>
            </div>
            </Link>
        </div>
      </header>
      </div>
    </div>
  )
}

export default Branding
