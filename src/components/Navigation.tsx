import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, MessageCircle } from "lucide-react";
const logoImg = "https://res.cloudinary.com/dvmrrn6gg/image/upload/v1783093256/Bioplast-India.b15aed0e23e6240fc2c1_ytxiku.png";

const WHATSAPP_NUMBER = "919112224123";
const WHATSAPP_MESSAGE = "Hi! I'm interested in your biodegradable bags for purchase.";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/certifications", label: "Certifications" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLinkClick = (href: string) => {
    if (location === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <span 
                className="flex items-center gap-2 group cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleLinkClick("/")}
              >
                <img
                  src={logoImg}
                  alt="Bioplast India Logo"
                  className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="text-xl font-bold text-green-900 group-hover:text-green-700 transition-colors hidden sm:inline">
                  Bioplast <span className="text-green-600">India</span>
                </span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 cursor-pointer"
                    onClick={() => handleLinkClick(link.href)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}

              {/* WhatsApp Button */}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 rounded-lg transition-all duration-300">
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-green-50 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-6 border-t border-green-100 animate-slide-up">
              <div className="flex flex-col gap-4 pt-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 block py-2 cursor-pointer"
                      onClick={() => {
                        setIsOpen(false);
                        handleLinkClick(link.href);
                      }}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}

                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 rounded-lg transition-all duration-300">
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>
    </>
  );
}
