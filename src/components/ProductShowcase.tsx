/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Product } from '../types';
import { Check, ShieldAlert, BadgeCheck, Settings } from 'lucide-react';

interface ProductShowcaseProps {
  onSelectProductForConfig: (bagType: string) => void;
}

export default function ProductShowcase({ onSelectProductForConfig }: ProductShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'carry' | 'garbage' | 'industrial' | 'agriculture' | 'raw'>('all');

  const products: Product[] = [
    {
      id: 'carry-u',
      name: 'Compostable U-Cut Shopping Bags',
      category: 'carry',
      description: 'Sturdy, light, and heat-resistant carry bags designed for supermarkets, retail malls, and grocery outlets.',
      image: '🛍️',
      specs: {
        material: 'Cornstarch & PLA / PBAT blend',
        thicknessRange: '20 to 45 Microns',
        sizes: ['10x14 inches', '13x16 inches', '16x20 inches'],
        loadCapacity: '3kg - 10kg',
        certifications: ['CPCB Approved', 'CIPET Tested', 'IS/ISO 17088'],
      },
      features: ['Smooth textured handle', 'High tear-resistant bottoms', 'Waterproof and leak-proof', 'Water-based non-toxic printing'],
    },
    {
      id: 'carry-d',
      name: 'Premium D-Cut Shopping Bags',
      category: 'carry',
      description: 'Elegant punch-handle D-cut bags ideal for premium garment shops, footwear showrooms, and brand outlets.',
      image: '👜',
      specs: {
        material: 'Starch-based biodegradable resin',
        thicknessRange: '30 to 55 Microns',
        sizes: ['12x15 inches', '14x18 inches', '16x22 inches'],
        loadCapacity: '5kg - 12kg',
        certifications: ['CPCB Approved', 'IS/ISO 17088', 'EN 13432'],
      },
      features: ['Reinforced die-cut handles', 'Stands upright with gusset options', 'Luxurious satin feeling', 'Fully customizable prints'],
    },
    {
      id: 'garbage-roll',
      name: 'Compostable Garbage Bags on Roll',
      category: 'garbage',
      description: 'Heavy-duty waste disposal bags with easy-tear perforations. Ideal for home kitchens, hotels, and corporate offices.',
      image: '🗑️',
      specs: {
        material: 'PBAT, PLA & Starch compostable blend',
        thicknessRange: '15 to 30 Microns',
        sizes: ['Small (17x19")', 'Medium (19x21")', 'Large (30x37")'],
        loadCapacity: '5kg - 25kg',
        certifications: ['CPCB Approved', 'ASTM D6400', 'EN 13432'],
      },
      features: ['Leakproof stellar bottom seal', 'Star-sealed flat packs or rolls', 'With convenient string-ties', 'Odor-masking compostable barrier'],
    },
    {
      id: 'courier',
      name: 'Biodegradable Courier & Mailing Bags',
      category: 'industrial',
      description: 'Secure, water-resistant self-adhesive mailing envelopes designed for ecological e-commerce order fulfillments.',
      image: '✉️',
      specs: {
        material: 'Heavy-duty compostable polymer',
        thicknessRange: '40 to 65 Microns',
        sizes: ['8x10 inches', '10x12 inches', '12x16 inches'],
        loadCapacity: 'Up to 15kg puncture threshold',
        certifications: ['CPCB Registered', 'ISO 14001', 'IS 17088'],
      },
      features: ['Permanent self-adhesive hot-melt strip', 'Puncture-proof double-seam seal', 'Dual opacity layer for privacy', 'Writable marker pen surface'],
    },
    {
      id: 'mulch-film',
      name: 'Eco-Friendly Agricultural Mulch Film',
      category: 'agriculture',
      description: 'Biodegradable crop protecting films that decompose directly in farm soil, eliminating chemical cleanup labor.',
      image: '🌱',
      specs: {
        material: 'Soil-biodegradable PBAT bio-resin',
        thicknessRange: '12 to 25 Microns',
        sizes: ['1.2m Width x 400m Roll', '1.5m Width x 400m Roll'],
        loadCapacity: 'N/A (Roll format)',
        certifications: ['TUV OK Biodegradable Soil', 'CIPET Certified'],
      },
      features: ['Naturally degrades directly in farm soil', 'Weed control & soil warmth retention', 'Moisture evaporation prevention', 'Zero microplastic accumulation'],
    },
    {
      id: 'raw-resin',
      name: 'Starch-Derived Bioplastic Resins',
      category: 'raw',
      description: 'Certified 100% compostable raw material granules for extrusion blow molding and injection molding plants.',
      image: '🔮',
      specs: {
        material: 'Thermoplastic starch (TPS) blends',
        thicknessRange: 'N/A (Granules)',
        sizes: ['25kg Heavy Bags', '750kg Jumbo Bags'],
        loadCapacity: 'N/A (Industrial pellet feed)',
        certifications: ['IS/ISO 17088', 'DIN CERTCO', 'BPI Certified'],
      },
      features: ['Ready-to-use blow film grades', 'Excellent stretch & melt strength', 'Compounded with food-grade starches', 'Uniform pellet size and moisture control'],
    },
  ];

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter(p => p.category === activeTab);

  const tabItems = [
    { id: 'all', label: 'All Products' },
    { id: 'carry', label: 'Carry Bags' },
    { id: 'garbage', label: 'Garbage Bags' },
    { id: 'industrial', label: 'E-commerce & Shipping' },
    { id: 'agriculture', label: 'Agricultural Film' },
    { id: 'raw', label: 'Raw Resins' },
  ];

  return (
    <section id="products" className="py-24 bg-stone-50 border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase font-mono">
            <BadgeCheck size={12} className="text-emerald-600" />
            <span>Product Catalog</span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-emerald-950 tracking-tight">
            Certified Earth-Friendly Replacements
          </h2>
          <p className="font-sans text-stone-600 text-sm sm:text-base">
            All our packaging materials undergo extensive testing for tensile strength, elongation, heat stability, and are certified strictly under Central Pollution Control Board (CPCB) norms.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-800 text-white shadow-md shadow-emerald-800/10'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-stone-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-emerald-500/20 transition-all group flex flex-col h-full"
            >
              {/* Product Visual Area */}
              <div className="bg-gradient-to-b from-stone-50 to-emerald-50/20 p-8 flex justify-center items-center relative min-h-[180px] border-b border-stone-100">
                <span className="text-6xl select-none filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </span>

                {/* Eco-Label overlay */}
                <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-emerald-100 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>100% COMPOSTABLE</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-sans font-bold text-lg text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-1.5 pt-2">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-xs text-stone-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spec Box */}
                <div className="bg-stone-50 border border-stone-150/50 rounded-2xl p-4 text-xs font-mono space-y-2 text-stone-600">
                  <div className="flex justify-between border-b border-stone-200/50 pb-1.5">
                    <span className="text-stone-400">Material:</span>
                    <span className="font-semibold text-stone-800 text-right max-w-[150px] truncate">{product.specs.material}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/50 pb-1.5">
                    <span className="text-stone-400">Thickness:</span>
                    <span className="font-semibold text-stone-800">{product.specs.thicknessRange}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/50 pb-1.5">
                    <span className="text-stone-400">Load Limit:</span>
                    <span className="font-semibold text-stone-800">{product.specs.loadCapacity}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1 justify-end">
                    {product.specs.certifications.map((cert, cIdx) => (
                      <span
                        key={cIdx}
                        className="bg-emerald-100/50 text-emerald-800 font-sans text-[9px] font-bold px-1.5 py-0.5 rounded"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Configure Button */}
                {product.id !== 'raw-resin' && (
                  <button
                    onClick={() => onSelectProductForConfig(product.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-emerald-800 hover:text-stone-50 border border-stone-200 hover:border-emerald-800 font-semibold rounded-xl text-xs text-stone-800 transition-all cursor-pointer"
                  >
                    <Settings size={13} />
                    <span>Configure Specifications</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Warning Callout */}
        <div className="mt-16 bg-amber-50 border border-amber-200/60 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
            <ShieldAlert size={24} />
          </div>
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-sans font-bold text-amber-950 text-base">Indian Packaging Compliance Notice</h4>
            <p className="font-sans text-stone-600 text-xs sm:text-sm leading-relaxed">
              As per the updated Plastic Waste Management (PWM) Rules of India, all biodegradable/compostable plastic carries must hold valid registration certificates issued by the <strong>Central Pollution Control Board (CPCB)</strong>. Bioplast India guarantees certified batches strictly matching the <strong>IS/ISO 17088</strong> standard. Do not purchase unregistered non-compliant materials.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
