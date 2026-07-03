/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Award, FileText, CheckCircle2, FileCheck } from 'lucide-react';

export default function Certifications() {
  const certList = [
    {
      id: 'cpcb',
      title: 'CPCB Manufacturer License',
      authority: 'Central Pollution Control Board, Govt of India',
      description: 'The mandatory regulatory certificate issued under Indian Plastic Waste Management (PWM) Rules. Authorizes official fabrication, marketing, and distribution of certified compostable carry bags across all Indian states.',
      code: 'Reg No: B-29016/PWM/Compostable/2026/04',
      badge: 'GOVERNMENT APPROVED',
    },
    {
      id: 'iso',
      title: 'IS/ISO 17088 Standard',
      authority: 'Bureau of Indian Standards (BIS)',
      description: 'Specifies the procedures and requirements for plastics and products made from plastics that are suitable for recovery through organic recycling (composting). Bioplast guarantees strict alignment.',
      code: 'Verified Standard Compliant',
      badge: 'NATIONAL METRIC',
    },
    {
      id: 'cipet',
      title: 'CIPET Lab Test Report',
      authority: 'Central Institute of Petrochemicals Engineering & Technology',
      description: 'Official test certificates from CIPET labs confirming that the material disintegrates within 90 days and fully biodegrades within 180 days in active soil with zero toxic heavy metals left behind.',
      code: 'CIPET/AC/TEST/2026/892',
      badge: 'LAB TESTED',
    },
    {
      id: 'en',
      title: 'EN 13432 Certification',
      authority: 'TUV Austria / DIN CERTCO (Europe)',
      description: 'The premier European harmonized standard for packaging recoverable through industrial composting and biodegradation. Guarantees safety for environmental ecosystems.',
      code: 'TUV OK Compost Industrial',
      badge: 'INTERNATIONAL STANDARD',
    },
    {
      id: 'astm',
      title: 'ASTM D6400 Specification',
      authority: 'American Society for Testing and Materials (USA)',
      description: 'The standard US specification for labeling plastics designed to be composted aerobically in municipal or industrial facilities. Verifies materials perform precisely as nutrient-rich soil additives.',
      code: 'ASTM D6400 Compliant',
      badge: 'GLOBAL METRIC',
    },
    {
      id: 'management',
      title: 'ISO 9001 & 14001 Standards',
      authority: 'URS Certification Bodies',
      description: 'Twin corporate standardizations for high quality manufacturing workflows (ISO 9001:2015) and responsible environmental management system protocols (ISO 14001:2015).',
      code: 'Cert Ref: QMS/EMS-48201',
      badge: 'CORPORATE QUALITY',
    },
  ];

  return (
    <section id="certifications" className="py-24 bg-stone-50 border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase font-mono">
            <Award size={12} className="text-emerald-600" />
            <span>Verifiable Credentials</span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-emerald-950 tracking-tight">
            100% Certified Eco-Compliance
          </h2>
          <p className="font-sans text-stone-600 text-sm sm:text-base">
            Bioplastics in India are strictly regulated. Bioplast India maintains absolute transparency, ensuring all manufactured batches possess registered certificates for unhindered trade and distribution.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certList.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                    {cert.id === 'cpcb' ? (
                      <FileCheck size={22} className="text-emerald-700" />
                    ) : (
                      <ShieldCheck size={22} className="text-emerald-700" />
                    )}
                  </div>
                  <span className="text-[9px] font-mono font-black tracking-wider text-emerald-700 bg-emerald-100/50 px-2 py-0.5 rounded-md uppercase">
                    {cert.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-sans font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {cert.title}
                  </h3>
                  <span className="text-[11px] font-mono text-stone-400 block font-semibold">{cert.authority}</span>
                  <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed pt-2">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Verified Code Box */}
              <div className="bg-stone-50 border border-stone-150 rounded-2xl p-3 flex items-center gap-2 text-[10px] font-mono text-stone-600">
                <FileText size={12} className="text-stone-400" />
                <span className="font-semibold text-stone-700 select-all">{cert.code}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Why Certifications Matter checklist */}
        <div className="mt-16 bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h4 className="font-sans font-bold text-stone-800 text-sm uppercase tracking-wider">How to Verify Authenticity</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="flex gap-3 items-start">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-stone-600 leading-relaxed">
                <strong>QR Code Scans:</strong> Every batch leaves our factory with packaging bags stamped with the manufacturer CPCB registration number and a verifiable QR code.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-stone-600 leading-relaxed">
                <strong>Thickness Stamp:</strong> Bag thicknesses are strictly matching standard micron metrics (e.g. 25u, 30u) printed cleanly on the margins.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-stone-600 leading-relaxed">
                <strong>Raw Material Traceability:</strong> Standardized compound markings verify that bags are 100% made from plant-based polymers and can compost entirely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
