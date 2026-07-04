import { Link, useLocation } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";
const logoImg = "https://res.cloudinary.com/dvmrrn6gg/image/upload/v1783093256/Bioplast-India.b15aed0e23e6240fc2c1_ytxiku.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [location] = useLocation();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/certifications", label: "Certifications" },
    { href: "/contact", label: "Contact" },
  ];

  const companyInfo = [
    { icon: MapPin, text: "Ayodhya, Uttar Pradesh, India" },
    { icon: Mail, text: "bioplast.in@gmail.com" },
    { icon: Phone, text: "+91-9112224123" },
  ];

  const handleLinkClick = (href: string) => {
    if (location === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white to-green-50 border-t border-green-100">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logoImg}
                alt="Bioplast India Logo"
                className="w-10 h-10 object-contain hover:scale-105 transition-transform duration-300"
              />
              <span className="text-xl font-bold text-green-900">
                Bioplast <span className="text-green-600">India</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Leading supplier of 100% biodegradable bags since 2023. Committed to sustainability and environmental responsibility.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-green-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span 
                      className="text-gray-600 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                      onClick={() => handleLinkClick(link.href)}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-green-900 mb-4">Contact Info</h3>
            <ul className="space-y-3">
              {companyInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                    <Icon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    {info.text === "Ayodhya, Uttar Pradesh, India" ? (
                      <a 
                        href="https://maps.app.goo.gl/zc2miSqHWkw43LiJ9" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline hover:text-green-700 transition-colors cursor-pointer"
                      >
                        <span>{info.text}</span>
                      </a>
                    ) : (
                      <span>{info.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-bold text-green-900 mb-4">Certifications</h3>
            <div className="space-y-2">
              <p className="text-gray-600 text-sm font-semibold">✓ CPCB Certified</p>
              <p className="text-gray-600 text-sm font-semibold">✓ CIPET Certified</p>
              <p className="text-gray-600 text-sm font-semibold">✓ Swachha Bharat Approved</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-200 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Bioplast India. All rights reserved. | Sustainable Packaging Solutions
          </p>

          <div className="flex gap-6">
            <Link href="/certifications">
              <span 
                className="text-gray-600 hover:text-green-600 text-sm transition-colors cursor-pointer"
                onClick={() => handleLinkClick("/certifications")}
              >
                Certifications
              </span>
            </Link>
            <Link href="/contact">
              <span 
                className="text-gray-600 hover:text-green-600 text-sm transition-colors cursor-pointer"
                onClick={() => handleLinkClick("/contact")}
              >
                Contact Us
              </span>
            </Link>
            <Link href="/">
              <span 
                className="text-gray-600 hover:text-green-600 text-sm transition-colors cursor-pointer"
                onClick={() => handleLinkClick("/")}
              >
                Privacy Policy
              </span>
            </Link>
          </div>
        </div>

        {/* Eco Message */}
        <div className="mt-8 text-center">
          <p className="text-green-700 text-sm font-semibold">
            🌱 Committed to a greener future through sustainable packaging solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
