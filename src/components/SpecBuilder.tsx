/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { SpecConfig } from '../types';
import { Ruler, ShieldCheck, Weight, Trash2, Calendar, ClipboardCheck } from 'lucide-react';

interface SpecBuilderProps {
  initialBagType?: string;
  onSendQueryToContact: (config: SpecConfig) => void;
}

export default function SpecBuilder({ initialBagType, onSendQueryToContact }: SpecBuilderProps) {
  const [config, setConfig] = useState<SpecConfig>({
    bagType: 'carry-u',
    width: 14,
    height: 18,
    gusset: 3,
    thickness: 30,
    color: '#f5f5f4', // Stone off-white
    printingColor: 'one-color',
    customText: 'ECO-FRIENDLY & 100% COMPOSTABLE',
    customLogoText: 'BIOPLAST INDIA',
    quantity: 500, // MOQ is 500kg
  });

  // Handle outside preset activation from Showcase
  useEffect(() => {
    if (initialBagType) {
      if (initialBagType === 'carry-u') {
        setConfig((prev) => ({ ...prev, bagType: 'carry-u', width: 13, height: 16, gusset: 3, thickness: 25 }));
      } else if (initialBagType === 'carry-d') {
        setConfig((prev) => ({ ...prev, bagType: 'carry-d', width: 14, height: 18, gusset: 4, thickness: 35 }));
      } else if (initialBagType === 'garbage-roll') {
        setConfig((prev) => ({ ...prev, bagType: 'garbage-roll', width: 19, height: 21, gusset: 0, thickness: 20 }));
      } else if (initialBagType === 'courier') {
        setConfig((prev) => ({ ...prev, bagType: 'courier', width: 10, height: 12, gusset: 0, thickness: 50 }));
      } else if (initialBagType === 'mulch-film') {
        setConfig((prev) => ({ ...prev, bagType: 'mulch-film', width: 40, height: 48, gusset: 0, thickness: 15 }));
      }
    }
  }, [initialBagType]);

  // Color options
  const colors = [
    { name: 'Eco Off-White', value: '#f5f5f4', text: '#1c1917' },
    { name: 'Herbal Sage', value: '#e2ece9', text: '#064e3b' },
    { name: 'Pure Sky', value: '#e0f2fe', text: '#0369a1' },
    { name: 'Sunny Straw', value: '#fef3c7', text: '#78350f' },
    { name: 'Charcoal Black', value: '#292524', text: '#fafaf9' },
  ];

  // Dynamic calculations based on configurations
  const calculateWeightPerBag = () => {
    // Density factor of compostable PBAT/PLA blend is around 1.25 g/cm³
    // Width * (Height + Gusset) * 2 * Thickness(microns) * Density * Conversion
    const totalWidth = config.width + config.gusset;
    const areaSquareInches = totalWidth * config.height * 2;
    const areaSquareCm = areaSquareInches * 6.4516;
    const thicknessCm = config.thickness / 10000;
    const volumeCm3 = areaSquareCm * thicknessCm;
    const weightGrams = volumeCm3 * 1.25;
    return parseFloat(weightGrams.toFixed(2));
  };

  const calculateBagsPerKg = () => {
    const singleBagWeight = calculateWeightPerBag();
    return Math.floor(1000 / singleBagWeight);
  };

  const calculateEstimatedLoadCapacity = () => {
    // Thickness, bag style, and size define structural limits
    const baseCapacity = config.thickness * 0.22; // 0.22kg per micron
    let multiplier = 1.0;

    if (config.bagType === 'carry-u') multiplier = 0.95; // Handle cutout decreases strength slightly
    if (config.bagType === 'carry-d') multiplier = 0.85; // Punch D cut places stress points
    if (config.bagType === 'garbage-roll') multiplier = 1.1; // Bottom star seal distributes weight well
    if (config.bagType === 'courier') multiplier = 1.2; // Sealed courier envelopes are highly resilient

    const capacity = baseCapacity * multiplier;
    return parseFloat(capacity.toFixed(1));
  };

  const calculateDegradationTime = () => {
    // Thicker materials require slightly longer to break down
    // Backyard vs Industrial
    const industrialDays = Math.floor(60 + config.thickness * 1.2);
    const backyardDays = Math.floor(110 + config.thickness * 2.0);
    return { industrialDays, backyardDays };
  };

  const singleBagWeight = calculateWeightPerBag();
  const bagsPerKg = calculateBagsPerKg();
  const totalEstimatedBags = bagsPerKg * config.quantity;
  const loadCapacity = calculateEstimatedLoadCapacity();
  const { industrialDays, backyardDays } = calculateDegradationTime();

  return (
    <section id="configurator" className="py-24 bg-white border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase font-mono">
            <ClipboardCheck size={12} className="text-emerald-600" />
            <span>Interactive Tool</span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-emerald-950 tracking-tight">
            Tailor-Make Your Organic Packaging
          </h2>
          <p className="font-sans text-stone-600 text-sm sm:text-base">
            Select parameters below to dynamically configure compostable packaging. Preview dimensions, strength tolerances, and biodegradation speeds in real time before requesting commercial production drafts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-stone-50 border border-stone-200/60 rounded-3xl p-6 sm:p-8 space-y-8">
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-lg text-emerald-950">1. Bag Style & Type</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'carry-u', label: 'U-Cut Carry Bag', emoji: '🛍️' },
                  { id: 'carry-d', label: 'D-Cut Carry Bag', emoji: '👜' },
                  { id: 'carry-w', label: 'W-Cut Vest Bag', emoji: '👕' },
                  { id: 'garbage-roll', label: 'Garbage Bag Roll', emoji: '🗑️' },
                  { id: 'courier', label: 'Courier Mailer', emoji: '✉️' },
                  { id: 'mulch-film', label: 'Mulch Film Roll', emoji: '🌱' },
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      // Adjust defaults based on styles
                      let newGusset = 0;
                      let newThickness = config.thickness;
                      if (style.id.startsWith('carry')) {
                        newGusset = 3;
                        newThickness = 30;
                      } else if (style.id === 'garbage-roll') {
                        newThickness = 20;
                      } else if (style.id === 'courier') {
                        newThickness = 50;
                      } else if (style.id === 'mulch-film') {
                        newThickness = 15;
                      }
                      setConfig((prev) => ({
                        ...prev,
                        bagType: style.id as any,
                        gusset: newGusset,
                        thickness: newThickness,
                      }));
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      config.bagType === style.id
                        ? 'bg-emerald-800 border-emerald-800 text-white shadow-md'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="text-xl mb-1">{style.emoji}</div>
                    <div className="text-xs font-bold leading-tight">{style.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensional Sliders */}
            <div className="space-y-6">
              <h3 className="font-sans font-bold text-lg text-emerald-950">2. Custom Measurements</h3>

              {/* Thickness */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-stone-600 flex items-center gap-1">
                    <Weight size={13} className="text-emerald-700" />
                    Thickness (Microns)
                  </span>
                  <span className="text-emerald-800 font-extrabold">{config.thickness} Microns</span>
                </div>
                <input
                  type="range"
                  min={config.bagType === 'mulch-film' ? 10 : 15}
                  max={100}
                  step={1}
                  value={config.thickness}
                  onChange={(e) => setConfig((prev) => ({ ...prev, thickness: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>Min: {config.bagType === 'mulch-film' ? 10 : 15}u</span>
                  <span>Standard: 25u - 40u</span>
                  <span>Max: 100u</span>
                </div>
              </div>

              {/* Width & Height Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-stone-600 flex items-center gap-1">
                      <Ruler size={13} className="text-emerald-700" />
                      Width (Inches)
                    </span>
                    <span className="text-emerald-800 font-extrabold">{config.width} inches</span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={config.bagType === 'mulch-film' ? 48 : 30}
                    step={0.5}
                    value={config.width}
                    onChange={(e) => setConfig((prev) => ({ ...prev, width: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-stone-600 flex items-center gap-1">
                      <Ruler size={13} className="text-emerald-700" />
                      Height (Inches)
                    </span>
                    <span className="text-emerald-800 font-extrabold">{config.height} inches</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={config.bagType === 'mulch-film' ? 60 : 36}
                    step={0.5}
                    value={config.height}
                    onChange={(e) => setConfig((prev) => ({ ...prev, height: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                  />
                </div>
              </div>

              {/* Gusset Slider (only show if carry) */}
              {config.bagType.startsWith('carry') && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-stone-600">Side Gusset / Expansion (Inches)</span>
                    <span className="text-emerald-800 font-extrabold">{config.gusset} inches</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    step={0.5}
                    value={config.gusset}
                    onChange={(e) => setConfig((prev) => ({ ...prev, gusset: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                  />
                  <div className="text-[10px] text-stone-400 font-sans leading-none">
                    Gussets represent side pleats which expand to hold volumetric packages cleanly.
                  </div>
                </div>
              )}
            </div>

            {/* Custom Brand Styling */}
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-lg text-emerald-950">3. Brand Aesthetics</h3>

              {/* Bag Color */}
              <div className="space-y-2">
                <span className="text-xs font-bold font-mono text-stone-600 block">Select Base Film Pigment</span>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setConfig((prev) => ({ ...prev, color: color.value }))}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        config.color === color.value
                          ? 'border-emerald-600 scale-110 shadow-sm'
                          : 'border-stone-300 hover:border-stone-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Text Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono text-stone-600">Printed Brand Logo Text</label>
                  <input
                    type="text"
                    maxLength={20}
                    value={config.customLogoText}
                    onChange={(e) => setConfig((prev) => ({ ...prev, customLogoText: e.target.value }))}
                    placeholder="Enter Brand Name"
                    className="w-full px-3.5 py-2 border border-stone-300 rounded-xl bg-white text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono text-stone-600">Compliance / Eco Slogan Text</label>
                  <input
                    type="text"
                    maxLength={40}
                    value={config.customText}
                    onChange={(e) => setConfig((prev) => ({ ...prev, customText: e.target.value }))}
                    placeholder="E.g., 100% COMPOSTABLE"
                    className="w-full px-3.5 py-2 border border-stone-300 rounded-xl bg-white text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Print Color Option */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold font-mono text-stone-600 block">Water-Based Ink Printing</span>
                <div className="flex gap-3">
                  {[
                    { id: 'none', label: 'No Print (Plain)' },
                    { id: 'one-color', label: '1-Color Print' },
                    { id: 'multi-color', label: 'Multi-Color Print' },
                  ].map((ink) => (
                    <button
                      key={ink.id}
                      onClick={() => setConfig((prev) => ({ ...prev, printingColor: ink.id as any }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        config.printingColor === ink.id
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300 border font-bold'
                          : 'bg-white border border-stone-200 text-stone-600'
                      }`}
                    >
                      {ink.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Manufacturing Batch Weight */}
            <div className="space-y-2 pt-2 border-t border-stone-200/50">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-stone-600">Target Production Quantity (KG)</span>
                <span className="text-emerald-800 font-extrabold">{config.quantity} KG</span>
              </div>
              <input
                type="range"
                min={500}
                max={5000}
                step={250}
                value={config.quantity}
                onChange={(e) => setConfig((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>MOQ: 500kg</span>
                <span>Wholesale: 1,500kg</span>
                <span>Bulk Enterprise: 5,000kg+</span>
              </div>
            </div>
          </div>

          {/* Interactive Mockup Preview & Output Spec Grid */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            {/* Bag Mockup Renderer */}
            <div className="bg-stone-50 border border-stone-200/60 rounded-3xl p-6 shadow-md flex flex-col items-center">
              <div className="text-center font-mono text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-4">
                Interactive 2D Spec Mockup
              </div>

              {/* Dynamic SVG Drawing */}
              <div className="w-full max-w-[260px] h-[320px] relative flex justify-center items-center bg-white/50 border border-stone-200/40 rounded-2xl overflow-hidden p-4 shadow-inner">
                {/* Visual Dimensions Tickers */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-stone-400 origin-center -rotate-90">
                  {config.height} in (H)
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-stone-400">
                  {config.width} in (W)
                </div>
                {config.gusset > 0 && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-stone-400 origin-center rotate-90">
                    + {config.gusset} in Gusset
                  </div>
                )}

                {/* SVG Bag Structure */}
                <svg
                  viewBox="0 0 160 200"
                  className="w-full h-full max-h-[250px] drop-shadow-lg transition-transform duration-300"
                >
                  {/* Outer Main Bag */}
                  <rect
                    x="25"
                    y="45"
                    width="110"
                    height="140"
                    rx="6"
                    fill={config.color}
                    stroke="#1c1917"
                    strokeWidth="1.5"
                    className="transition-colors duration-300"
                  />

                  {/* Handle variations */}
                  {config.bagType === 'carry-u' && (
                    <>
                      {/* U-cut cutout handle */}
                      <path
                        d="M 50 45 Q 50 80, 80 80 Q 110 80, 110 45"
                        fill="#ffffff"
                        stroke="#1c1917"
                        strokeWidth="1.5"
                      />
                    </>
                  )}

                  {/* Vest handle helper overlays (W-cut style) */}
                  {config.bagType === 'carry-w' && (
                    <>
                      {/* Cutout style resembling singlet vest handles */}
                      <path
                        d="M 45 45 L 45 95 L 115 95 L 115 45 Z"
                        fill="#ffffff"
                        stroke="#1c1917"
                        strokeWidth="1.5"
                      />
                    </>
                  )}

                  {/* Punch Handle D-cut style */}
                  {config.bagType === 'carry-d' && (
                    <>
                      {/* Punch handle cutout at upper portion */}
                      <rect
                        x="62"
                        y="60"
                        width="36"
                        height="12"
                        rx="6"
                        fill="#ffffff"
                        stroke="#1c1917"
                        strokeWidth="1.5"
                      />
                    </>
                  )}

                  {/* Garbage Bag roll perforations/indicator */}
                  {config.bagType === 'garbage-roll' && (
                    <>
                      {/* Draw dotted line showing roll perforation */}
                      <line x1="25" y1="170" x2="135" y2="170" stroke="#78716c" strokeWidth="1.5" strokeDasharray="3,3" />
                      {/* Draw trash icon on garbage bag */}
                      <circle cx="80" cy="115" r="22" fill="none" stroke="#292524" strokeWidth="1" strokeDasharray="2,2" />
                      <path d="M 75 105 L 85 105 L 85 125 L 75 125 Z" fill="none" stroke="#292524" strokeWidth="1.2" />
                    </>
                  )}

                  {/* Courier Bag strip flap */}
                  {config.bagType === 'courier' && (
                    <>
                      {/* Draw the stick flap at top */}
                      <rect x="25" y="45" width="110" height="15" fill="#a8a29e" stroke="#1c1917" strokeWidth="1" />
                      <line x1="25" y1="52" x2="135" y2="52" stroke="#ef4444" strokeWidth="1" />
                    </>
                  )}

                  {/* Mulch Film visual lines */}
                  {config.bagType === 'mulch-film' && (
                    <>
                      {/* Draw horizontal lines indicating rolled agricultural sheets */}
                      <line x1="25" y1="80" x2="135" y2="80" stroke="#78716c" strokeWidth="1" />
                      <line x1="25" y1="110" x2="135" y2="110" stroke="#78716c" strokeWidth="1" />
                      <line x1="25" y1="140" x2="135" y2="140" stroke="#78716c" strokeWidth="1" />
                    </>
                  )}

                  {/* Printed Slogans and brand simulated if printed is checked */}
                  {config.printingColor !== 'none' && (
                    <g fill={config.color === '#292524' ? '#fafaf9' : '#047857'} className="transition-colors duration-300">
                      {/* Brand Logo text in upper center */}
                      <text
                        x="80"
                        y="110"
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="bold"
                        fontFamily="monospace"
                        className="tracking-wider uppercase"
                      >
                        {config.customLogoText || 'BIOPLAST'}
                      </text>

                      {/* Eco Slogan Text in bottom middle */}
                      <text
                        x="80"
                        y="145"
                        textAnchor="middle"
                        fontSize="5"
                        fontWeight="600"
                        fontFamily="sans-serif"
                        className="tracking-wide text-emerald-800"
                      >
                        {config.customText || '100% COMPOSTABLE'}
                      </text>

                      {/* Seedling small vector */}
                      <path
                        d="M 80 120 C 80 115, 76 112, 76 109 C 76 112, 80 114, 80 120 Z"
                      />
                      <path
                        d="M 80 118 C 80 114, 84 112, 84 109 C 84 112, 80 114, 80 118 Z"
                      />
                      <line x1="80" y1="122" x2="80" y2="116" strokeWidth="0.8" stroke={config.color === '#292524' ? '#fafaf9' : '#047857'} />
                    </g>
                  )}
                </svg>
              </div>

              {/* Film Spec Badge */}
              <div className="mt-4 flex gap-2">
                <span className="bg-stone-200 text-stone-800 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md">
                  {config.thickness} Micron
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md uppercase">
                  Cornstarch Film
                </span>
              </div>
            </div>

            {/* Spec Output Grid */}
            <div className="bg-stone-50 border border-stone-200/60 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-sans font-bold text-lg text-emerald-950 flex items-center gap-2">
                <ShieldCheck className="text-emerald-600" />
                Technical Specifications
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-stone-150 p-4 rounded-2xl text-center space-y-1 shadow-sm">
                  <div className="text-[10px] font-mono uppercase font-bold text-stone-400">Unit Weight</div>
                  <div className="text-lg font-extrabold text-stone-900 font-mono">{singleBagWeight}g</div>
                  <div className="text-[10px] text-stone-500 font-sans leading-none">Estimate per Bag</div>
                </div>

                <div className="bg-white border border-stone-150 p-4 rounded-2xl text-center space-y-1 shadow-sm">
                  <div className="text-[10px] font-mono uppercase font-bold text-stone-400">Estimated Count</div>
                  <div className="text-lg font-extrabold text-stone-900 font-mono">~{totalEstimatedBags.toLocaleString()}</div>
                  <div className="text-[10px] text-stone-500 font-sans leading-none">Bags in {config.quantity}kg batch</div>
                </div>

                <div className="bg-white border border-stone-150 p-4 rounded-2xl text-center space-y-1 shadow-sm">
                  <div className="text-[10px] font-mono uppercase font-bold text-stone-400">Load Bearing</div>
                  <div className="text-lg font-extrabold text-stone-900 font-mono">{loadCapacity} kg</div>
                  <div className="text-[10px] text-stone-500 font-sans leading-none">Tensile Strength Limit</div>
                </div>

                <div className="bg-white border border-stone-150 p-4 rounded-2xl text-center space-y-1 shadow-sm">
                  <div className="text-[10px] font-mono uppercase font-bold text-stone-400">Bioplastics Standard</div>
                  <div className="text-xs font-extrabold text-emerald-800 mt-2 font-mono leading-none">IS/ISO 17088</div>
                  <div className="text-[9px] text-stone-500 font-sans mt-1">100% Compostable Approved</div>
                </div>
              </div>

              {/* Biodegradation Durations */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 font-mono">
                  <Calendar size={14} className="text-emerald-700" />
                  Estimated Biodegradation Speeds
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-stone-500 block">Industrial Compost:</span>
                    <strong className="text-emerald-900 text-sm font-mono">{industrialDays} Days</strong>
                    <span className="text-[9px] text-stone-400 block leading-tight">Controlled heat & micro-activity</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-stone-500 block">Ambient Soil/Backyard:</span>
                    <strong className="text-emerald-900 text-sm font-mono">{backyardDays} Days</strong>
                    <span className="text-[9px] text-stone-400 block leading-tight">Natural ground temperature</span>
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <button
                onClick={() => onSendQueryToContact(config)}
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-stone-50 font-bold rounded-2xl transition-all shadow-md hover:shadow-lg shadow-emerald-700/10 cursor-pointer text-center text-sm"
              >
                Send Commercial Spec Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
