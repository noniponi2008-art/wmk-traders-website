import React from 'react';
import { CommodityContract } from '../types.ts';
import { ASSET_IMAGES } from '../data/mockData.ts';

interface QualitySpecsDrawerProps {
  contract: CommodityContract | null;
  onClose: () => void;
}

export const QualitySpecsDrawer: React.FC<QualitySpecsDrawerProps> = ({ contract, onClose }) => {
  if (!contract) return null;

  const specs = contract.qualitySpecs;

  return (
    <div className="fixed inset-0 bg-[#10243A]/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#10243A] max-w-xl w-full p-6 space-y-5 my-8">
        <div className="border-b border-[#CBD5E1] pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B99A5B]">
              Analytical Certificate of Inspection
            </span>
            <h3 className="text-lg font-bold text-[#10243A]">{contract.tradeRef} Specifications</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 font-bold text-xl cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Lab Photo Banner */}
        <div className="relative h-40 bg-[#10243A] border border-[#CBD5E1] overflow-hidden">
          <img
            src={ASSET_IMAGES.inspectionLab}
            alt="Commodity testing laboratory"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10243A]/90 via-[#10243A]/20 to-transparent flex flex-col justify-end p-4">
            <span className="text-white text-xs font-bold uppercase tracking-wider">
              {contract.commodity}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">
              Grade Standard: {contract.grade}
            </span>
          </div>
        </div>

        {/* Specifications Matrix */}
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-[#CBD5E1] p-3 bg-[#FAFBFD]">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block">Moisture Content</span>
              <strong className="text-base font-bold text-[#10243A] tabular-nums mt-0.5 block">
                {specs.moisturePct}% (Max Allowed: 14.0%)
              </strong>
              <span className="text-[10px] text-emerald-800 font-medium">Compliant with GAFTA 119</span>
            </div>

            <div className="border border-[#CBD5E1] p-3 bg-[#FAFBFD]">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block">Foreign Matter</span>
              <strong className="text-base font-bold text-[#10243A] tabular-nums mt-0.5 block">
                {specs.foreignMatterPct}% (Max: 1.5%)
              </strong>
              <span className="text-[10px] text-emerald-800 font-medium">Tolerances Within Range</span>
            </div>

            {specs.proteinPct !== undefined && (
              <div className="border border-[#CBD5E1] p-3 bg-[#FAFBFD]">
                <span className="text-[10px] uppercase font-bold text-[#64748B] block">Protein Content</span>
                <strong className="text-base font-bold text-[#10243A] tabular-nums mt-0.5 block">
                  {specs.proteinPct}% Min Dry Basis
                </strong>
                <span className="text-[10px] text-[#64748B]">Kjeldahl Method N x 5.7</span>
              </div>
            )}

            {specs.testWeightKgHl !== undefined && (
              <div className="border border-[#CBD5E1] p-3 bg-[#FAFBFD]">
                <span className="text-[10px] uppercase font-bold text-[#64748B] block">Test Weight</span>
                <strong className="text-base font-bold text-[#10243A] tabular-nums mt-0.5 block">
                  {specs.testWeightKgHl} kg/hL
                </strong>
                <span className="text-[10px] text-[#64748B]">Chondrometer Verified</span>
              </div>
            )}

            {specs.purityPct !== undefined && (
              <div className="border border-[#CBD5E1] p-3 bg-[#FAFBFD]">
                <span className="text-[10px] uppercase font-bold text-[#64748B] block">Chemical Purity</span>
                <strong className="text-base font-bold text-[#10243A] tabular-nums mt-0.5 block">
                  {specs.purityPct}% Assay
                </strong>
                <span className="text-[10px] text-emerald-800 font-medium">High Purity Standard</span>
              </div>
            )}

            <div className="border border-[#CBD5E1] p-3 bg-[#FAFBFD]">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block">Sampling Standard</span>
              <strong className="text-sm font-semibold text-[#10243A] mt-0.5 block">
                ISO 24333 / GAFTA 124
              </strong>
              <span className="text-[10px] text-[#64748B]">Automatic Diverter Sampler</span>
            </div>
          </div>

          <div className="border border-[#E2E8F0] p-3 bg-[#F4F5F7] text-[11px] text-[#64748B] flex items-center justify-between">
            <span>Certification Authority: SGS / Control Union International</span>
            <span className="text-[#10243A] font-semibold">Seal #CU-884920-VER</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="h-10 px-6 bg-[#10243A] hover:bg-[#1E293B] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
