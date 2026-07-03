/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Leaf, Phone, Mail, Award } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onCtaClick: () => void;
}

export default function Navbar({ activeSection, setActiveSection, onCtaClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'process', label: 'Decomposition' },
    { id: 'configurator', label: 'Spec Builder' },
    { id: 'calculator', label: 'Eco Calculator' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Banner Ticker */}
      <div className="bg-emerald-950 text-stone-100 py-1.5 px-4 text-xs font-medium border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={12} className="text-emerald-400" />
              <span>+91 98765 43210</span>
            </span>
            <span className="flex items-center gap-1">
              <Mail size={12} className="text-emerald-400" />
              <span>sales@bioplastindia.com</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={12} className="text-amber-400" />
            <span className="text-[11px] tracking-wider uppercase text-stone-300">CPCB Certified Manufacturer (PWM Rules)</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-50/95 backdrop-blur-md py-3 shadow-sm border-b border-stone-200/50'
            : 'bg-stone-50/70 backdrop-blur-sm py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:bg-emerald-500 transition-colors">
                <Leaf size={18} className="animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-lg tracking-tight text-emerald-950 leading-none">
                  BIOPLAST
                </span>
                <span className="font-mono text-[9px] tracking-widest text-emerald-600 uppercase font-bold mt-0.5">
                  INDIA
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeSection === item.id
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-stone-600 hover:text-emerald-800 hover:bg-stone-100/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={onCtaClick}
                className="ml-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-stone-50 text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-emerald-700/10 cursor-pointer"
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-lg text-stone-600 hover:text-emerald-800 hover:bg-stone-100 focus:outline-none cursor-pointer"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="md:hidden bg-stone-50 border-b border-stone-200/50 py-3 px-4 shadow-inner">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                    activeSection === item.id
                      ? 'text-emerald-800 bg-emerald-50 font-semibold border-l-4 border-emerald-600'
                      : 'text-stone-600 hover:text-emerald-800 hover:bg-stone-100/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 px-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onCtaClick();
                  }}
                  className="w-full text-center py-2.5 bg-emerald-700 hover:bg-emerald-800 text-stone-50 font-semibold rounded-xl shadow-sm cursor-pointer"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
