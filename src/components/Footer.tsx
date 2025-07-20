import { BrainCircuit } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      {/* Top border glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="container mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row justify-between items-left gap-6">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="px-1 bg-primary/10 rounded">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-mono text-white">
                Mind<span className="text-cyan-700 animate-pulse">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} MindFlow - All rights reserved
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-2 text-sm">
            <Link
              href="/about"
              className="text-muted-foreground hover:text-cyan-500 transition-colors"
            >
              Neural Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-cyan-500 transition-colors"
            >
              Quantum Analysis
            </Link>
            <Link
              href="/main"
              className="text-muted-foreground hover:text-cyan-500 transition-colors"
            >
              Therapy
            </Link>
            <Link
              href="/therapy"
              className="text-muted-foreground hover:text-cyan-500 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-md bg-background/50">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-mono text-white hover:text-cyan-500">SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;