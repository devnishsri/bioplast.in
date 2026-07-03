/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Leaf, ShieldCheck, TreePine, Recycle } from 'lucide-react';

interface HeroProps {
  onExploreProducts: () => void;
  onConfigureBag: () => void;
}

export default function Hero({ onExploreProducts, onConfigureBag }: HeroProps) {
  return (
    <section id="home" className="relative bg-gradient-to-b from-emerald-50/40 via-stone-50 to-stone-50 pt-32 pb-20 overflow-hidden">
      {/* Decorative organic background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-amber-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase font-mono">
              <Leaf size={12} className="text-emerald-600" />
              <span>Pioneering Sustainable Packaging</span>
            </div>

            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-emerald-950 tracking-tight leading-[1.1]">
              100% Compostable & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
                Biodegradable
              </span>{' '}
              Packaging Solutions
            </h1>

            <p className="font-sans text-stone-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Replacing conventional single-use plastics with certified starch-based polymers. From carry bags to agricultural films, we manufacture eco-friendly alternatives that decompose naturally back into soil within 180 days, leaving zero toxic residue.
            </p>

            {/* Approved Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 border border-stone-200 rounded-xl text-stone-700 text-xs font-medium">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>CPCB (Govt of India) Approved</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 border border-stone-200 rounded-xl text-stone-700 text-xs font-medium">
                <Recycle size={14} className="text-emerald-600" />
                <span>IS/ISO 17088 Standard</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 border border-stone-200 rounded-xl text-stone-700 text-xs font-medium">
                <TreePine size={14} className="text-emerald-600" />
                <span>CIPET Certified 100% Biodegradable</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onConfigureBag}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-stone-50 font-bold rounded-xl transition-all shadow-md hover:shadow-lg shadow-emerald-700/10 hover:shadow-emerald-700/20 text-sm cursor-pointer"
              >
                <span>Interactive Spec Builder</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 hover:border-stone-300 font-semibold rounded-xl transition-all text-sm cursor-pointer"
              >
                View Product Catalog
              </button>
            </div>
          </div>

          {/* Interactive Hero Visual Container */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[400px] h-[400px] sm:h-[450px] bg-gradient-to-tr from-emerald-100/60 to-teal-50/50 rounded-3xl p-6 border border-stone-200/50 shadow-xl shadow-stone-200/20 flex flex-col justify-between overflow-hidden">
              {/* Absorbent pattern overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#0f766e_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04]" />

              {/* Top Card Widget */}
              <div className="bg-white/90 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-4 shadow-sm z-10 flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                  <Leaf size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-wider uppercase text-stone-400 font-bold">Raw Material</div>
                  <div className="text-xs font-bold text-stone-800">Natural Corn & Potato Starches</div>
                </div>
              </div>

              {/* Center SVG Composting Loop Graphic */}
              <div className="relative flex justify-center items-center py-4">
                <svg className="w-48 h-48 text-emerald-600" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                  </defs>
                  {/* Outer composting circular arrows */}
                  <path
                    d="M 50 15 A 35 35 0 0 1 85 50"
                    fill="none"
                    stroke="url(#circleGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    className="animate-[spin_12s_linear_infinite]"
                  />
                  <path
                    d="M 85 50 A 35 35 0 0 1 50 85"
                    fill="none"
                    stroke="url(#circleGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    className="animate-[spin_12s_linear_infinite]"
                  />
                  <path
                    d="M 50 85 A 35 35 0 0 1 15 50"
                    fill="none"
                    stroke="url(#circleGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    className="animate-[spin_12s_linear_infinite]"
                  />
                  <path
                    d="M 15 50 A 35 35 0 0 1 50 15"
                    fill="none"
                    stroke="url(#circleGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    className="animate-[spin_12s_linear_infinite]"
                  />

                  {/* Seedling Icon in Center */}
                  <circle cx="50" cy="50" r="24" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1" />
                  {/* Leaves */}
                  <path d="M 50 62 C 50 50, 42 44, 42 36 C 42 44, 50 48, 50 62 Z" fill="#059669" />
                  <path d="M 50 58 C 50 48, 58 44, 58 38 C 58 45, 50 49, 50 58 Z" fill="#10b981" />
                  <path d="M 50 62 L 50 48" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
                </svg>

                {/* Floating Micro-Badges */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-3 shadow-sm z-10 text-center">
                  <div className="text-xl font-extrabold text-emerald-800">180d</div>
                  <div className="text-[9px] font-mono text-stone-400 uppercase font-bold">100% Bio-Degradation</div>
                </div>

                <div className="absolute -right-4 bottom-6 bg-white/90 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-3 shadow-sm z-10 text-center">
                  <div className="text-xl font-extrabold text-emerald-800">0%</div>
                  <div className="text-[9px] font-mono text-stone-400 uppercase font-bold">Microplastics Left</div>
                </div>
              </div>

              {/* Bottom Card Widget */}
              <div className="bg-emerald-950 border border-emerald-900 rounded-2xl p-4 shadow-md z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-mono font-medium tracking-wider uppercase">Environmental Contribution</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold font-mono text-white">4,821,032</span>
                  <span className="text-[10px] text-stone-300 font-medium">kg Plastic Replaced</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Stats Panel */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="text-center space-y-1 md:border-r md:border-stone-200/60 last:border-r-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900 font-mono">12+</div>
            <div className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Years Manufacturing</div>
          </div>
          <div className="text-center space-y-1 md:border-r md:border-stone-200/60 last:border-r-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900 font-mono">15,000+</div>
            <div className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Tons Annual Capacity</div>
          </div>
          <div className="text-center space-y-1 md:border-r md:border-stone-200/60 last:border-r-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900 font-mono">100%</div>
            <div className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Compostable Materials</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900 font-mono">450+</div>
            <div className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Happy B2B Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}
