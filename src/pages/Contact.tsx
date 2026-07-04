import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import SuccessPopup from "@/components/SuccessPopup";
import { db, auth } from "../lib/firebase";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User 
} from "firebase/auth";
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where 
} from "firebase/firestore";

const WHATSAPP_NUMBER = "919112224123";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
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
  
  // Auth and history states
  const [user, setUser] = useState<User | null>(null);
  const [pastInquiries, setPastInquiries] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Sync auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setFormData((prev) => ({
          ...prev,
          name: prev.name || currentUser.displayName || "",
          email: prev.email || currentUser.email || "",
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchPastInquiries = async (userId: string) => {
    setIsLoadingHistory(true);
    const path = "contacts";
    try {
      const q = query(
        collection(db, path), 
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setPastInquiries(items);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPastInquiries(user.uid);
    } else {
      setPastInquiries([]);
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      toast.success(`Welcome ${result.user.displayName || "User"}!`);
    } catch (error: any) {
      console.error("Sign-in error:", error);
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
    } catch (error: any) {
      console.error("Sign-out error:", error);
      toast.error("Failed to sign out");
    }
  };

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

      if (user) {
        inquiryData.userId = user.uid;
      }

      // Write directly to Firestore
      await setDoc(doc(db, path, contactId), inquiryData);

      // Show success popup
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: user?.displayName || "",
        phone: "",
        email: user?.email || "",
        message: "",
      });

      // Refresh submissions
      if (user) {
        fetchPastInquiries(user.uid);
      }
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-green-100">
                  <div>
                    <h2 className="text-2xl font-bold text-green-900">Send us a Message</h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {user ? "Your secure authenticated session is active" : "Sign in with Google to sync and track quotes"}
                    </p>
                  </div>
                  
                  {user ? (
                    <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-3 py-1.5 shadow-sm max-w-full overflow-hidden shrink-0">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName || "User"} 
                          className="w-7 h-7 rounded-full border border-green-300 shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-green-200 flex items-center justify-center text-green-800 text-xs font-bold shrink-0">
                          {user.displayName?.charAt(0) || "U"}
                        </div>
                      )}
                      <div className="text-left overflow-hidden">
                        <div className="text-xs font-bold text-green-900 leading-tight truncate max-w-[120px]">
                          {user.displayName}
                        </div>
                        <button 
                          onClick={handleSignOut}
                          className="text-[10px] font-semibold text-red-600 hover:text-red-800 flex items-center gap-0.5 mt-0.5 cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-300 hover:border-green-400 rounded-xl text-xs font-bold text-gray-700 hover:text-green-800 transition-all shadow-sm cursor-pointer active:scale-95 shrink-0"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path
                          fill="#EA4335"
                          d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.74 14.93 1 12 1 7.37 1 3.4 3.65 1.5 7.5l3.75 2.91C6.15 7.41 8.85 5.04 12 5.04z"
                        />
                        <path
                          fill="#4285F4"
                          d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.45c-.28 1.48-1.12 2.74-2.38 3.59l3.71 2.87c2.17-2 3.71-4.94 3.71-8.56z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.25 14.59c-.24-.71-.38-1.48-.38-2.59s.14-1.88.38-2.59L1.5 6.5C.54 8.42 0 10.58 0 13s.54 4.58 1.5 6.5l3.75-2.91z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c3.24 0 5.96-1.08 7.95-2.93l-3.71-2.87c-1.03.69-2.34 1.1-4.24 1.1-3.15 0-5.85-2.37-6.75-5.37l-3.75 2.9C3.4 20.35 7.37 23 12 23z"
                        />
                      </svg>
                      <span>Sign In with Google</span>
                    </button>
                  )}
                </div>

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
              {user && (
                <Card className="border-green-100 p-8 bg-green-50/40">
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-green-100">
                    <h3 className="text-xl font-bold text-green-900 flex items-center gap-2">
                      <span>My Past Submissions</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border border-green-200">
                        {pastInquiries.length}
                      </span>
                    </h3>
                  </div>

                  {isLoadingHistory ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500 text-sm">
                      <svg className="animate-spin h-5 w-5 text-green-600 mb-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Syncing submissions...</span>
                    </div>
                  ) : pastInquiries.length > 0 ? (
                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                      {pastInquiries.map((inquiry) => (
                        <div key={inquiry.id} className="p-4 bg-white border border-green-100 rounded-xl shadow-sm text-xs space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-gray-400 font-bold">{inquiry.id}</span>
                            <span className="text-gray-400 font-mono text-[10px]">
                              {new Date(inquiry.createdAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="text-gray-700">
                            <span className="font-semibold text-gray-900">Message snippet:</span>
                            <p className="mt-1 line-clamp-2 italic text-gray-600">{inquiry.message}</p>
                          </div>
                          <div className="pt-1.5 border-t border-gray-50 flex items-center justify-between text-[10px]">
                            <span className="text-green-700 bg-green-50 font-bold px-1.5 py-0.5 rounded-md border border-green-100">
                              ✓ Received by Commercial Cell
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      <p>No past submissions found.</p>
                      <p className="text-xs text-gray-400 mt-1">Submit your first inquiry using the form!</p>
                    </div>
                  )}
                </Card>
              )}

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
