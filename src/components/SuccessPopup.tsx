import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function SuccessPopup({
  isOpen,
  onClose,
  message = "Thank you for your message! We'll get back to you soon.",
}: SuccessPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-4 transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Checkmark Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div
            className={`transform transition-all duration-500 ${
              isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
            }`}
          >
            <CheckCircle className="w-16 h-16 text-green-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-center text-green-900 mb-3">
          Success!
        </h2>

        {/* Description */}
        <p
          className={`text-center text-gray-600 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          {message}
        </p>

        {/* Progress Bar */}
        <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 rounded-full"
            style={{
              animation: isVisible ? "progress 3.5s ease-out forwards" : "none",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
