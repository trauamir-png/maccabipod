"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "בית" },
  { href: "/episodes", label: "פרקים" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-950/95 backdrop-blur border-b border-navy-700">
      <div className="max-w-6xl mx-auto px-4 h-28 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo.png"
            alt="מכביפוד"
            width={3000}
            height={495}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-maccabi-yellow transition-colors text-base font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/episodes"
            className="bg-maccabi-yellow text-navy-950 px-5 py-2.5 rounded-full text-base font-bold hover:bg-maccabi-yellow-light transition-colors"
          >
            האזן עכשיו
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden text-blue-200 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="תפריט"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-navy-700 bg-navy-900">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-maccabi-yellow transition-colors py-2 text-base font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/episodes"
              className="mt-2 bg-maccabi-yellow text-navy-950 px-4 py-2 rounded-full text-sm font-bold text-center"
              onClick={() => setMenuOpen(false)}
            >
              האזן עכשיו
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
