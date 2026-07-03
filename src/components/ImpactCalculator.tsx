/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CalculationResult } from '../types';
import { Leaf, Info, ShieldAlert, Sparkles, Navigation, Trees } from 'lucide-react';

export default function ImpactCalculator() {
  const [businessType, setBusinessType] = useState<'custom' | 'grocery' | 'boutique' | 'office' | 'courier'>('grocery');
  const [bagCountMonthly, setBagCountMonthly] = useState<number>(30000);
  const [averageBagWeight, setAverageBagWeight] = useState<number>(8); // in grams

  // Presets for Business sizes
  const presets = {
    grocery: { label: 'Supermarket / Grocery Chain', count: 50000, weight: 10 },
    boutique: { label: 'Boutique Apparel Retailer', count: 8000, weight: 18 },
    office: { label: 'Corporate Office Waste Bags', count: 3000, weight: 22 },
    courier: { label: 'E-commerce Courier Shipments', count: 25000, weight: 14 },
    custom: { label: 'Custom B2B Operation', count: 15000, weight: 8 },
  };

  const handlePresetChange = (type: keyof typeof presets) => {
    setBusinessType(type);
    setBagCountMonthly(presets[type].count);
    setAverageBagWeight(presets[type].weight);
  };

  // Computations based on scientific factors:
  // - Traditional HDPE/LDPE plastic bags release about 2.1kg of CO2 per kg of plastic produced & disposed.
  // - Starch bioplastics have a net CO2 reduction factor of around 70-80% compared to fossil fuel plastics (approx 0.4kg CO2 per kg).
  // - 1 mature tree absorbs ~22kg of CO2 per year.
  // - 1 average car releases ~0.4kg of CO2 per mile driven.
  // - 1 plastic bag fragmented generates roughly 120,000 microplastic fibers (0.12 million).
  const calculateImpact = (): CalculationResult => {
    const totalBagsYearly = bagCountMonthly * 12;
    const plasticWeightKgYearly = (totalBagsYearly * averageBagWeight) / 1000;

    // Fossil-fuel CO2: weight * 2.1kg
    // Bioplast CO2: weight * 0.42kg
    // Net saved CO2: weight * 1.68kg
    const co2SavedKg = plasticWeightKgYearly * 1.68;
    const trees = Math.ceil(co2SavedKg / 22);
    const carMiles = Math.ceil(co2SavedKg / 0.4);
    const microplastics = Math.ceil((totalBagsYearly * 120000) / 1000000); // in millions

    return {
      plasticSavedKg: Math.round(plasticWeightKgYearly),
      co2PreventedKg: Math.round(co2SavedKg),
      treesEquivalent: trees,
      carMilesSaved: carMiles,
      microplasticsPreventedMillions: microplastics,
    };
  };

  const results = calculateImpact();

  return (
    <section id="calculator" className="py-24 bg-stone-50 border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase font-mono">
            <Sparkles size={12} className="text-emerald-600" />
            <span>Environmental Auditing</span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-emerald-950 tracking-tight">
            Calculate Your Plastic & Carbon Offset
          </h2>
          <p className="font-sans text-stone-600 text-sm sm:text-base">
            Understand the physical environmental returns of migrating from petroleum-based packaging to Bioplast compostables. Input your current estimated plastic usage below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Controls Column */}
          <div className="lg:col-span-6 bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-sans font-bold text-lg text-emerald-950">1. Current Corporate Scale</h3>

            {/* Presets Selectors */}
            <div className="space-y-2">
              <span className="text-xs font-bold font-mono text-stone-500 block">Select Operations Preset</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(presets) as Array<keyof typeof presets>).map((key) => (
                  <button
                    key={key}
                    onClick={() => handlePresetChange(key)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all border ${
                      businessType === key
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {presets[key].label.split(' ')[0]} Preset
                  </button>
                ))}
              </div>
            </div>

            {/* Range sliders */}
            <div className="space-y-6 pt-4 border-t border-stone-100">
              {/* Monthly Bag count */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-stone-600">Bags / Packages Used Monthly</span>
                  <span className="text-emerald-800 font-extrabold">{bagCountMonthly.toLocaleString()} pcs</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={500000}
                  step={businessType === 'grocery' || businessType === 'courier' ? 5000 : 1000}
                  value={bagCountMonthly}
                  onChange={(e) => {
                    setBusinessType('custom');
                    setBagCountMonthly(parseInt(e.target.value));
                  }}
                  className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[9px] text-stone-400 font-mono">
                  <span>1K pcs</span>
                  <span>100K pcs</span>
                  <span>500K pcs</span>
                </div>
              </div>

              {/* Single Unit Weight */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-stone-600">Average Package Weight (Grams)</span>
                  <span className="text-emerald-800 font-extrabold">{averageBagWeight} Grams</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={50}
                  step={1}
                  value={averageBagWeight}
                  onChange={(e) => {
                    setBusinessType('custom');
                    setAverageBagWeight(parseInt(e.target.value));
                  }}
                  className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[9px] text-stone-400 font-mono">
                  <span>Light Bag: 3g</span>
                  <span>Heavy Mailer: 25g</span>
                  <span>Sack Liners: 50g</span>
                </div>
              </div>
            </div>

            {/* Educational Info box */}
            <div className="bg-stone-50 border border-stone-200/50 rounded-2xl p-4 flex gap-3 text-xs text-stone-500 leading-relaxed">
              <Info size={16} className="text-emerald-700 shrink-0 mt-0.5" />
              <div>
                Our bioplastics rely on renewable starch feedstocks. The carbon credit gains are calculated using standard <strong>LCA (Life Cycle Assessment)</strong> metrics showing up to <strong>78%</strong> savings on greenhouse emissions compared to fossil HDPE polymers.
              </div>
            </div>
          </div>

          {/* Environmental Savings Output */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-emerald-950 text-stone-50 border border-emerald-900 rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
              <div className="flex items-center justify-between border-b border-emerald-800 pb-4">
                <div>
                  <h4 className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">Yearly Conservation Impact</h4>
                  <p className="text-stone-300 text-xs sm:text-sm">Based on {presets[businessType]?.label || 'Custom settings'}</p>
                </div>
                <Leaf size={24} className="text-emerald-400 animate-pulse" />
              </div>

              {/* Primary metric */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">Fossil Plastic Waste Prevented</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400">
                    {results.plasticSavedKg.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-stone-300">KG / Year</span>
                </div>
                <span className="text-[10px] text-stone-400 block leading-none">
                  Weight equivalent of petroleum-derived bags diverted from piling landfills.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-emerald-900">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-stone-300 uppercase tracking-wider">CO₂ Footprint Eliminated</span>
                  <div className="text-xl font-bold font-mono text-stone-100">
                    {results.co2PreventedKg.toLocaleString()} kg
                  </div>
                  <span className="text-[9px] text-stone-400 block">Carbon greenhouse emissions reduced.</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-stone-300 uppercase tracking-wider">Ocean Microplastics Prevented</span>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {results.microplasticsPreventedMillions.toLocaleString()} M
                  </div>
                  <span className="text-[9px] text-stone-400 block">Fractions that will never pollute oceans.</span>
                </div>
              </div>
            </div>

            {/* Visual Equivalents container */}
            <div className="bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h4 className="font-sans font-bold text-stone-800 text-sm uppercase tracking-wider">Impact Equivalency Representation</h4>

              <div className="space-y-6">
                {/* Trees equivalent */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-stone-600 flex items-center gap-1.5">
                      <Trees size={16} className="text-emerald-600" />
                      CO₂ Absorption Equivalent of Mature Trees
                    </span>
                    <strong className="text-stone-800 font-mono text-sm">{results.treesEquivalent} Trees</strong>
                  </div>
                  {/* Miniature trees visualization block */}
                  <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3 flex flex-wrap gap-1 items-center justify-center min-h-[48px]">
                    {Array.from({ length: Math.min(results.treesEquivalent, 42) }).map((_, i) => (
                      <span key={i} className="text-lg filter drop-shadow-sm select-none animate-[bounce_1.5s_infinite] [animation-delay:0.1s]">🌲</span>
                    ))}
                    {results.treesEquivalent > 42 && (
                      <span className="text-xs font-mono font-bold text-stone-400 ml-1">
                        + {results.treesEquivalent - 42} more trees
                      </span>
                    )}
                  </div>
                </div>

                {/* Car Miles saved */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-stone-600 flex items-center gap-1.5">
                      <Navigation size={15} className="text-emerald-600" />
                      Avoided Gasoline Driving Miles
                    </span>
                    <strong className="text-stone-800 font-mono text-sm">{results.carMilesSaved.toLocaleString()} miles</strong>
                  </div>
                  {/* CSS driving road representation */}
                  <div className="relative h-4 bg-stone-800 rounded-full overflow-hidden flex items-center border border-stone-700">
                    <div className="absolute inset-x-0 h-0.5 border-t border-dashed border-stone-300 opacity-60" />
                    <span className="absolute text-sm right-4 transform hover:scale-110 transition-all cursor-pointer">🚗💨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
