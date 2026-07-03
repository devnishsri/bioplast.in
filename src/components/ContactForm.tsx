/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { SpecConfig } from '../types';
import { Mail, Phone, MapPin, CheckCircle, Copy, FileText, ArrowRight } from 'lucide-react';

interface ContactFormProps {
  preconfiguredSpec: SpecConfig | null;
  clearPreconfiguredSpec: () => void;
}

export default function ContactForm({ preconfiguredSpec, clearPreconfiguredSpec }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    productCategory: 'carry-u',
    monthlyVolume: '500kg - 1000kg',
    printingRequirement: 'one-color',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedQuoteId, setGeneratedQuoteId] = useState('');
  const [copiedQuoteId, setCopiedQuoteId] = useState(false);

  // Sync with Spec Builder configurations if provided
  useEffect(() => {
    if (preconfiguredSpec) {
      setFormData((prev) => ({
        ...prev,
        productCategory: preconfiguredSpec.bagType,
        printingRequirement: preconfiguredSpec.printingColor,
        message: `CONFIGURED VIA SPEC BUILDER:\n- Dimensions: ${preconfiguredSpec.width}" x ${preconfiguredSpec.height}"${preconfiguredSpec.gusset > 0 ? ` + ${preconfiguredSpec.gusset}" Gusset` : ''}\n- Thickness: ${preconfiguredSpec.thickness} Microns\n- Bag Pigment: ${preconfiguredSpec.color}\n- Branding Text: "${preconfiguredSpec.customLogoText}"\n- Slogan Text: "${preconfiguredSpec.customText}"\n- Configured MOQ: ${preconfiguredSpec.quantity} KG`,
      }));

      // Scroll smoothly to contact form
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [preconfiguredSpec]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Verify minimum form requirements
    if (!formData.name || !formData.email || !formData.phone) {
      return;
    }

    // Generate simulated Quote ID
    const randomHex = Math.random().toString(16).substr(2, 6).toUpperCase();
    const newQuoteId = `BPI-2026-${randomHex}`;
    setGeneratedQuoteId(newQuoteId);
    setIsSubmitted(true);
  };

  const handleCopyQuoteId = () => {
    navigator.clipboard.writeText(generatedQuoteId);
    setCopiedQuoteId(true);
    setTimeout(() => setCopiedQuoteId(false), 2000);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    clearPreconfiguredSpec();
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      designation: '',
      productCategory: 'carry-u',
      monthlyVolume: '500kg - 1000kg',
      printingRequirement: 'one-color',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase font-mono">
            <Mail size={12} className="text-emerald-600" />
            <span>Corporate Communications</span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-emerald-950 tracking-tight">
            Consult Our Eco-Packaging Specialists
          </h2>
          <p className="font-sans text-stone-600 text-sm sm:text-base">
            Discuss wholesale distribution rates, sample package deliveries, and custom compounding formulations for your specific industrial requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact coordinates column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-lg text-emerald-950">Wholesale Contacts</h3>
              <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed">
                Connect directly with our regional distribution teams or schedule an in-person audit at our primary blowing plant.
              </p>
            </div>

            {/* Coordinate Cards */}
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-250/30">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/60 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wide">Customer Hotline</h4>
                  <p className="text-sm font-bold text-stone-800 mt-1">+91 98765 43210</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Mon - Sat: 9:00 AM to 6:00 PM (IST)</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-250/30">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/60 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wide">Inbound Inquiries</h4>
                  <p className="text-sm font-bold text-stone-800 mt-1">sales@bioplastindia.com</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Average response threshold: 2 Hours</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-250/30">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/60 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wide">Gujarat Manufacturing Unit</h4>
                  <p className="text-xs font-bold text-stone-800 mt-1">GIDC Naroda Industrial Estate,</p>
                  <p className="text-xs text-stone-800 mt-0.5">Phase IV, Ahmedabad, Gujarat - 382330</p>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded mt-2 inline-block">Primary Extrusion Facility</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form container column */}
          <div className="lg:col-span-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-stone-50 border border-stone-200/60 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-bold text-lg text-emerald-950">Inquiry Specification Request</h3>
                  {preconfiguredSpec && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 animate-pulse">
                      Spec Config Loaded
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono text-stone-600 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="E.g., Rajesh Sharma"
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-xl bg-white text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono text-stone-600 block">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="E.g., rajesh@retail.com"
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-xl bg-white text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono text-stone-600 block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="E.g., +91 99999 88888"
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-xl bg-white text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono text-stone-600 block">Company Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder="E.g., GreenCart Organics Ltd"
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-xl bg-white text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Selected Product */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono text-stone-600 block">Required Product</label>
                    <select
                      value={formData.productCategory}
                      onChange={(e) => setFormData((prev) => ({ ...prev, productCategory: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-stone-300 rounded-xl bg-white text-xs text-stone-700 focus:outline-none"
                    >
                      <option value="carry-u">U-Cut Carry Bag</option>
                      <option value="carry-d">D-Cut Carry Bag</option>
                      <option value="carry-w">W-Cut Vest Bag</option>
                      <option value="garbage-roll">Garbage Bag Roll</option>
                      <option value="courier">Courier Mailer</option>
                      <option value="mulch-film">Mulch Film</option>
                    </select>
                  </div>

                  {/* Monthly Volume */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono text-stone-600 block">Monthly Quantity</label>
                    <select
                      value={formData.monthlyVolume}
                      onChange={(e) => setFormData((prev) => ({ ...prev, monthlyVolume: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-stone-300 rounded-xl bg-white text-xs text-stone-700 focus:outline-none"
                    >
                      <option value="500kg - 1000kg">500kg - 1000kg (MOQ)</option>
                      <option value="1000kg - 5000kg">1000kg - 5000kg</option>
                      <option value="5000kg - 20000kg">5000kg - 20000kg</option>
                      <option value="20000kg+">20000kg+ Bulk Contract</option>
                    </select>
                  </div>

                  {/* Printing Requirement */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono text-stone-600 block">Print Customization</label>
                    <select
                      value={formData.printingRequirement}
                      onChange={(e) => setFormData((prev) => ({ ...prev, printingRequirement: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-stone-300 rounded-xl bg-white text-xs text-stone-700 focus:outline-none"
                    >
                      <option value="none">Plain (No Prints)</option>
                      <option value="one-color">1-Color Flexographic</option>
                      <option value="multi-color">Multi-Color flexographic</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono text-stone-600 block">Specific Requirements / Spec details</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Enter sizes, micron thickness, or raw compound specifications..."
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-xl bg-white text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-stone-50 font-bold rounded-xl transition-all shadow-md cursor-pointer text-center text-sm"
                >
                  Submit Quote Inquiry
                </button>
              </form>
            ) : (
              /* High-end corporate Receipt summary page upon submission */
              <div className="bg-emerald-50 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md text-stone-800 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200/60 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                      <CheckCircle size={28} className="animate-bounce" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-lg text-emerald-950">Inquiry Lodged Successfully</h3>
                      <p className="text-stone-500 text-xs font-sans">Thank you, {formData.name}. Our commercial cell will contact you shortly.</p>
                    </div>
                  </div>

                  <div className="bg-white border border-emerald-200 rounded-xl p-3 flex flex-col items-center">
                    <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest leading-none">Inquiry Reference</span>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-xs font-extrabold font-mono text-stone-800 select-all">{generatedQuoteId}</span>
                      <button
                        onClick={handleCopyQuoteId}
                        className="text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
                        title="Copy Reference"
                      >
                        <Copy size={12} />
                      </button>
                    </div>
                    {copiedQuoteId && <span className="text-[9px] text-emerald-700 font-bold mt-0.5 font-mono">Copied!</span>}
                  </div>
                </div>

                {/* Specs breakdown card */}
                <div className="bg-white border border-stone-200/50 rounded-2xl p-4 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2 font-sans font-bold text-sm text-stone-800 border-b border-stone-100 pb-2">
                    <FileText size={16} className="text-emerald-700" />
                    Lodged Specifications Summary
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                      <span className="text-stone-400">Target Product:</span>
                      <span className="font-bold text-stone-800 uppercase">
                        {formData.productCategory.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                      <span className="text-stone-400">Monthly Volume:</span>
                      <span className="font-bold text-stone-800">{formData.monthlyVolume}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                      <span className="text-stone-400">Ink printing:</span>
                      <span className="font-bold text-stone-800 uppercase">{formData.printingRequirement}</span>
                    </div>
                    {formData.company && (
                      <div className="flex justify-between border-b border-stone-100 pb-1.5">
                        <span className="text-stone-400">Enterprise:</span>
                        <span className="font-bold text-stone-800 truncate max-w-[150px]">{formData.company}</span>
                      </div>
                    )}
                  </div>

                  {formData.message && (
                    <div className="bg-stone-50 rounded-xl p-3 text-xs font-sans text-stone-600 max-h-[140px] overflow-y-auto whitespace-pre-line border border-stone-100">
                      <strong>Requirement Notes:</strong><br />
                      {formData.message}
                    </div>
                  )}
                </div>

                {/* Customer Next Steps */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-widest">Expected Next Steps</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                      <strong className="text-emerald-950 block">Step 1: Representative Match</strong>
                      <p className="text-stone-500 mt-1 leading-relaxed">A certified flexible packaging advisor will call you within 2 business hours.</p>
                    </div>
                    <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                      <strong className="text-emerald-950 block">Step 2: Sample Mailer</strong>
                      <p className="text-stone-500 mt-1 leading-relaxed">We can dispatch raw material sample bags of your specified micron size free of cost.</p>
                    </div>
                    <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                      <strong className="text-emerald-950 block">Step 3: Proforma Invoice</strong>
                      <p className="text-stone-500 mt-1 leading-relaxed">You will receive a formal commercial draft breakdown outlining shipment logistics.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                  >
                    <span>Lodge Another Inquiry</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
