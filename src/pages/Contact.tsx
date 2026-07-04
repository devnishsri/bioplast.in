import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import SuccessPopup from "@/components/SuccessPopup";
import { db } from "../lib/firebase";
import { 
  doc, 
  setDoc 
} from "firebase/firestore";

const WHATSAPP_NUMBER = "919112224123";

enum OperationType {
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone validation (basic)
    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);
    const path = "contacts";

    try {
      const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
      const contactId = `BPI-2026-${randomHex}`;

      const inquiryData: any = {
        id: contactId,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString(),
      };

      // Write directly to Firestore
      await setDoc(doc(db, path, contactId), inquiryData);

      // Show success popup
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I'm interested in your biodegradable bags for purchase.`;

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-green-50 to-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our biodegradable bags? We'd love to hear from you. Reach out today and let's discuss how we can support your business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <Card className="border-green-100 hover:border-green-300 hover:shadow-lg transition-all p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900">Address</h3>
                </div>
                <a 
                  href="https://maps.app.goo.gl/zc2miSqHWkw43LiJ9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-700 hover:underline hover:text-green-700 transition-colors cursor-pointer block mt-1"
                >
                  Ayodhya, Uttar Pradesh, India
                </a>
              </div>
              
              <div className="mt-6 overflow-hidden rounded-lg border border-green-100 shadow-inner relative group h-40 w-full shrink-0">
                {/* Map Iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57013.6842187766!2d82.16104435!3d26.78018445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a07937e6da455%3A0x2bf67a0dca0c207!2sAyodhya%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map of Ayodhya, Uttar Pradesh"
                  className="opacity-90 group-hover:opacity-100 transition-opacity"
                />
                {/* Overlay link to ensure clicking opens map in a new tab */}
                <a
                  href="https://maps.app.goo.gl/zc2miSqHWkw43LiJ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-transparent cursor-pointer flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/5"
                >
                  <span className="bg-white/95 text-green-800 text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-md border border-green-100 backdrop-blur-sm">
                    Open in Google Maps ↗
                  </span>
                </a>
              </div>
            </Card>

            <Card className="border-green-100 hover:border-green-300 hover:shadow-lg transition-all p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-900">Email</h3>
              </div>
              <a href="mailto:bioplast.in@gmail.com" className="text-green-600 hover:text-green-700 font-semibold">
                bioplast.in@gmail.com
              </a>
            </Card>

            <Card className="border-green-100 hover:border-green-300 hover:shadow-lg transition-all p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-900">Phone</h3>
              </div>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-green-600 hover:text-green-700 font-semibold">
                +91-9112224123
              </a>
            </Card>
          </div>

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-up">
              <Card className="border-green-100 p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-green-900 mb-6">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-green-200 focus:border-green-600 focus:ring-green-600"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-semibold mb-2 block">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-green-200 focus:border-green-600 focus:ring-green-600"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-green-200 focus:border-green-600 focus:ring-green-600"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-semibold mb-2 block">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your inquiry or requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="border-green-200 focus:border-green-600 focus:ring-green-600 resize-none"
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 active:scale-95"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Company Info */}
            <div className="space-y-8">
              <Card className="border-green-100 p-8 bg-gradient-to-br from-green-50 to-white">
                <h2 className="text-2xl font-bold text-green-900 mb-6">Why Contact Us?</h2>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 text-2xl">📦</div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-1">Product Inquiries</h3>
                      <p className="text-gray-600 text-sm">
                        Learn more about our biodegradable bags and find the perfect solution for your business.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 text-2xl">💼</div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-1">Bulk Orders</h3>
                      <p className="text-gray-600 text-sm">
                        Get special pricing and customization options for large-scale orders.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 text-2xl">🤝</div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-1">Partnership Opportunities</h3>
                      <p className="text-gray-600 text-sm">
                        Explore collaboration and distribution opportunities with Bioplast India.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 text-2xl">❓</div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-1">General Questions</h3>
                      <p className="text-gray-600 text-sm">
                        Have any questions? We're here to help and provide all the information you need.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Contact */}
              <Card className="border-green-100 p-8 bg-gradient-to-br from-green-600 to-green-700 text-white">
                <h3 className="text-2xl font-bold mb-4">Quick Chat on WhatsApp</h3>
                <p className="mb-6 opacity-90">
                  For immediate assistance, connect with us on WhatsApp. We typically respond within minutes during business hours.
                </p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-white text-green-600 hover:bg-green-50 font-semibold py-3 rounded-lg transition-all duration-300">
                    Chat on WhatsApp
                  </Button>
                </a>
              </Card>

              {/* Business Hours */}
              <Card className="border-green-100 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-green-900">Business Hours</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM IST
                  </p>
                  <p>
                    <span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM IST
                  </p>
                  <p>
                    <span className="font-semibold">Sunday:</span> Closed
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Thank you for your message! We'll get back to you soon."
      />
    </div>
  );
}
