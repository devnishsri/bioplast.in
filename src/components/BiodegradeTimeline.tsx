/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Stage {
  day: number;
  title: string;
  subtitle: string;
  description: string;
  graphicState: 'intact' | 'cracking' | 'pieces' | 'granules' | 'soil';
  nutrients: string[];
}

export default function BiodegradeTimeline() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages: Stage[] = [
    {
      day: 0,
      title: 'Disposal & Moisture Exposure',
      subtitle: 'The Decomposition Cycle Begins',
      description: 'Once disposed of in a composting bin, garden pit, or industrial composting unit, Bioplast materials absorb ambient moisture. The surface swells slightly, allowing beneficial soil bacteria and microscopic fungi to latch onto the molecular chains of the starch structure.',
      graphicState: 'intact',
      nutrients: ['0% weight loss', 'Polymers fully intact', 'No initial visual changes'],
    },
    {
      day: 30,
      title: 'Microbial Colonization',
      subtitle: 'Fungi & Bacteria Break Polymers',
      description: 'Micro-organisms secrete extracellular enzymes that break down starch molecules. Natural plastic-binding PLA/PBAT chains begin weakening and lose their high-tensile resistance. Tiny micro-fissures open on the bag.',
      graphicState: 'cracking',
      nutrients: ['~20% mass reduction', 'Fissures on handles and seams', 'Loss of physical load capacity'],
    },
    {
      day: 90,
      title: 'Structural Fragmentation',
      subtitle: 'Disintegration into Eco-Fractions',
      description: 'The material loses all mechanical resistance and disintegrates into microscopic pieces. The organic carbon is ingested by bacteria. There are absolutely no toxic remnants, synthetic binders, or hazardous materials released into the groundwater.',
      graphicState: 'pieces',
      nutrients: ['~60% disintegration', 'Completely brittle segments', 'Zero chemical leaching'],
    },
    {
      day: 150,
      title: 'Enzymatic Digestion',
      subtitle: 'Full Assimilation into Biomass',
      description: 'Bacteria consume the fragmented granules, converting them directly into natural carbon dioxide (CO2), water, and mineral salts. The biopolymer molecules are completely assimilated by nature’s food chain.',
      graphicState: 'granules',
      nutrients: ['~95% bioconversion', 'Invisible to the human eye', 'No synthetic microplastics left'],
    },
    {
      day: 180,
      title: 'Rich Compost & Soil Humus',
      subtitle: 'Nutrient Feed for Agricultural Crops',
      description: 'The decomposition is 100% complete! The material has fully degraded, leaving behind carbon-dense, nutrient-rich organic humus compost. This fertile soil conditioner is perfectly suited for biological agriculture, orchards, and gardens.',
      graphicState: 'soil',
      nutrients: ['100% complete biodegradation', 'Rich carbon compost left', 'Promotes plant growth & crop health'],
    },
  ];

  const renderBagGraphic = (state: Stage['graphicState']) => {
    switch (state) {
      case 'intact':
        return (
          <svg viewBox="0 0 100 120" className="w-32 h-36">
            <rect x="25" y="25" width="50" height="70" rx="4" fill="#a7f3d0" stroke="#047857" strokeWidth="2" />
            <path d="M 35 25 Q 35 45, 50 45 Q 65 45, 65 25" fill="#ffffff" stroke="#047857" strokeWidth="1.5" />
            <circle cx="50" cy="65" r="10" fill="#047857" opacity="0.15" />
            <path d="M 50 71 L 50 62 L 47 65 M 50 62 L 53 65" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'cracking':
        return (
          <svg viewBox="0 0 100 120" className="w-32 h-36">
            <rect x="25" y="25" width="50" height="70" rx="4" fill="#a7f3d0" stroke="#047857" strokeWidth="2" opacity="0.8" />
            <path d="M 35 25 Q 35 45, 50 45 Q 65 45, 65 25" fill="#ffffff" stroke="#047857" strokeWidth="1.5" opacity="0.8" />
            {/* Cracks */}
            <path d="M 28 40 L 38 43 L 34 50" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 72 70 L 62 73 L 66 82" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 45 30 L 48 35" stroke="#065f46" strokeWidth="1.5" fill="none" />
          </svg>
        );
      case 'pieces':
        return (
          <svg viewBox="0 0 100 120" className="w-32 h-36">
            {/* Exploded fragments of the bag */}
            <path d="M 25 25 L 35 28 L 30 40 Z" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
            <path d="M 60 22 L 72 26 L 68 38 Z" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
            <path d="M 40 50 L 52 48 L 48 65 L 38 60 Z" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
            <path d="M 20 70 L 32 75 L 28 85 L 18 80 Z" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
            <path d="M 65 65 L 75 75 L 70 88 Z" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
            {/* Small bacteria dots */}
            <circle cx="48" cy="35" r="2" fill="#047857" />
            <circle cx="58" cy="80" r="1.5" fill="#10b981" />
            <circle cx="24" cy="55" r="2" fill="#10b981" />
          </svg>
        );
      case 'granules':
        return (
          <svg viewBox="0 0 100 120" className="w-32 h-36">
            {/* Only tiny dust/granule circles on floor */}
            <circle cx="30" cy="85" r="3" fill="#a7f3d0" opacity="0.6" />
            <circle cx="40" cy="90" r="2" fill="#047857" opacity="0.8" />
            <circle cx="50" cy="87" r="4" fill="#a7f3d0" opacity="0.6" />
            <circle cx="60" cy="92" r="1.5" fill="#047857" />
            <circle cx="70" cy="88" r="3" fill="#a7f3d0" opacity="0.6" />
            {/* Soil lines */}
            <path d="M 15 95 Q 50 90, 85 95" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'soil':
        return (
          <svg viewBox="0 0 100 120" className="w-32 h-36">
            {/* Rich brown compost soil with healthy flower sprouts growing */}
            <path d="M 15 95 Q 50 90, 85 95" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Sprouts */}
            <path d="M 40 92 Q 42 75, 50 72" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 50 72 C 48 68, 42 68, 42 72 C 42 76, 50 72, 50 72 Z" fill="#10b981" />
            <path d="M 50 72 C 52 68, 58 68, 58 72 C 58 76, 50 72, 50 72 Z" fill="#059669" />

            <path d="M 65 93 Q 63 82, 60 80" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 60 80 C 58 77, 54 77, 54 80 C 54 83, 60 80, 60 80 Z" fill="#10b981" />

            {/* Earthworms/micro symbols */}
            <path d="M 25 105 Q 28 102, 32 104" stroke="#f43f5e" strokeWidth="1" fill="none" />
          </svg>
        );
    }
  };

  const currentStage = stages[activeStage];

  return (
    <section id="process" className="py-24 bg-white border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase font-mono">
            <Calendar size={12} className="text-emerald-600" />
            <span>Science of Biodegradation</span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-emerald-950 tracking-tight">
            How Starch Bioplastic Biodegrades
          </h2>
          <p className="font-sans text-stone-600 text-sm sm:text-base">
            Unlike fossil fuel plastics that fragment into eternal carcinogenic microplastics, Bioplast packaging undergoes complete, organic cellular assimilation over a 180-day cycle.
          </p>
        </div>

        {/* Dynamic Stepper Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold font-mono text-stone-400 uppercase tracking-widest block mb-1">
              Select Degradation Timeline Stage:
            </span>

            <div className="space-y-3">
              {stages.map((stage, idx) => (
                <button
                  key={stage.day}
                  onClick={() => setActiveStage(idx)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
                    activeStage === idx
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {/* Step bubble */}
                  <div
                    className={`w-12 h-12 rounded-xl flex flex-col justify-center items-center font-mono shrink-0 transition-colors ${
                      activeStage === idx
                        ? 'bg-emerald-700 text-stone-50'
                        : 'bg-white border border-stone-200 text-stone-700'
                    }`}
                  >
                    <span className="text-[10px] uppercase leading-none text-stone-400 font-bold">Day</span>
                    <span className="text-lg font-black leading-none">{stage.day}</span>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className={`text-sm font-bold leading-tight ${activeStage === idx ? 'text-emerald-950 font-extrabold' : 'text-stone-700'}`}>
                      {stage.title}
                    </h4>
                    <span className="text-xs text-stone-400 font-medium font-sans block">{stage.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Graphic & Status Column */}
          <div className="lg:col-span-7 bg-stone-50 border border-stone-200/60 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-inner min-h-[360px]">
            {/* Visual stage display */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-white border border-stone-200/50 rounded-2xl p-6 shadow-sm">
              <div className="mb-2 font-mono text-[9px] uppercase font-bold text-stone-400 tracking-wider">
                Microscopic State
              </div>
              <div className="relative">
                {renderBagGraphic(currentStage.graphicState)}
                {/* Floating age badge */}
                <div className="absolute -bottom-2 -right-2 bg-emerald-950 text-emerald-400 font-mono text-xs font-bold px-2 py-0.5 rounded-md">
                  Day {currentStage.day}
                </div>
              </div>
            </div>

            {/* Information stage display */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-wider block">Stage {activeStage + 1}</span>
                <h3 className="font-sans font-bold text-xl text-emerald-950 mt-1">{currentStage.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
                  {currentStage.description}
                </p>
              </div>

              {/* Nutrients Checklist */}
              <div className="space-y-2 border-t border-stone-200/60 pt-4">
                <span className="text-[10px] font-mono text-stone-400 uppercase font-bold block">Scientific Diagnostics:</span>
                <div className="space-y-1.5">
                  {currentStage.nutrients.map((nut, nIdx) => (
                    <div key={nIdx} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      <span className="text-xs font-medium text-stone-700">{nut}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informational Callout */}
        <div className="mt-16 bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 sm:p-8 flex items-start gap-4">
          <ShieldAlert size={20} className="text-emerald-700 mt-1 shrink-0" />
          <div className="space-y-1">
            <h5 className="font-sans font-bold text-emerald-950 text-sm">Industrial Composting vs. Home Backyard Decomposition</h5>
            <p className="font-sans text-stone-600 text-xs sm:text-sm leading-relaxed">
              <strong>Industrial facilities</strong> maintain high temperatures (55-60°C) and consistent humidity which accelerate biological assimilation, achieving complete degradation in under 75 days. In <strong>standard soil or backyard compost piles</strong>, the process occurs at standard ambient ground temperatures, taking between 120 and 180 days. Both environments yield completely non-toxic soil biomass.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
