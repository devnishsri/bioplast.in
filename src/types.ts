/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'carry' | 'garbage' | 'industrial' | 'agriculture' | 'raw';
  description: string;
  image: string;
  specs: {
    material: string;
    thicknessRange: string;
    sizes: string[];
    loadCapacity: string;
    certifications: string[];
  };
  features: string[];
}

export interface SpecConfig {
  bagType: 'carry-u' | 'carry-d' | 'carry-w' | 'garbage-roll' | 'courier' | 'mulch-film';
  width: number; // inches
  height: number; // inches
  gusset: number; // inches, only for some bags
  thickness: number; // microns
  color: string; // color hex/name
  printingColor: 'none' | 'one-color' | 'multi-color';
  customText: string;
  customLogoText: string;
  quantity: number; // in kg
}

export interface CalculationResult {
  plasticSavedKg: number;
  co2PreventedKg: number;
  treesEquivalent: number;
  carMilesSaved: number;
  microplasticsPreventedMillions: number;
}
