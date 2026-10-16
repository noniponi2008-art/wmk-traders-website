import React from 'react';
import { VesselVoyage } from '../types.ts';
import { ASSET_IMAGES } from '../data/mockData.ts';

interface VesselDetailModalProps {
  vessel: VesselVoyage | null;
  onClose: () => void;
}

export const VesselDetailModal: React.FC<VesselDetailModalProps> = ({ vessel, onClose }) => {
  if (!vessel) return null;

  return (
    <div className="fixed inset-0 bg-[#10243A]/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#10243A] max-w-2xl w-full p-6 space-y-5 my-8">
        <div className="border-b border-[#CBD5E1] pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B99A5B]">
              Charter Party Maritime Dossier
            </span>
            <h3 className="text-lg font-bold text-[#10243A]">
              {vessel.vesselName} ({vessel.imoNumber})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 font-bold text-xl cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Vessel Visual Banner */}
        <div className="relative h-48 bg-[#10243A] border border-[#CBD5E1] overflow-hidden">
          <img
            src={ASSET_IMAGES.cargoVessel}
            alt="Panamax bulk carrier underway"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10243A]/90 via-[#10243A]/30 to-transparent flex flex-col justify-end p-4">
            <span className="text-white text-sm font-bold uppercase tracking-wider">
              {vessel.cargoType}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">
              Class: {vessel.vesselClass} · Flag: {vessel.flag}
            </span>
          </div>
        </div>

        {/* Key Voyage Specs */}
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="border border-[#CBD5E1] p-3 bg-[#FAFBFD]">
              <span className="text-[10px] text-[#64748B] uppercase font-bold block">Current Status</span>
              <strong className="text-sm font-bold text-[#10243A] uppercase mt-0.5 block">
                {vessel.status}
              </strong>
              <span className="text-[10px] text-[#64748B]">Position: {vessel.coordinates}</span>
            </div>

            <div className="border border-[#CBD5E1] p-3 bg-[#FAFBFD]">
              <span className="text-[10px] text-[#64748B] uppercase font-bold block">Bill of Lading</span>
              <strong className="text-sm font-mono font-bold text-[#10243A] mt-0.5 block truncate">
                {vessel.billOfLadingRef}
              </strong>
              <span className="text-[10px] text-emerald-800 font-medium">Clean On-Board</span>
            </div>

            <div className="border border-[#CBD5E1] p-3 bg-[#FAFBFD]">
              <span className="text-[10px] text-[#64748B] uppercase font-bold block">Cargo Tonnage</span>
              <strong className="text-sm font-mono font-bold text-[#10243A] tabular-nums mt-0.5 block">
                {vessel.tonnageMT.toLocaleString()} MT
              </strong>
              <span className="text-[10px] text-[#64748B]">Draft: {vessel.draftMeters}m</span>
            </div>

            <div className="border border-[#CBD5E1] p-3 bg-[#FAFBFD]">
              <span className="text-[10px] text-[#64748B] uppercase font-bold block">Port of Loading</span>
              <strong className="text-xs font-semibold text-[#10243A] mt-0.5 block truncate">
                {vessel.originPort}
              </strong>
              <span className="text-[10px] text-[#64748B]">NOR Tendered &amp; Accepted</span>
            </div>

            <div className="border border-[#CBD5E1] p-3 bg-[#FAFBFD]">
              <span className="text-[10px] text-[#64748B] uppercase font-bold block">Destination &amp; ETA</span>
              <strong className="text-xs font-semibold text-[#10243A] mt-0.5 block truncate">
                {vessel.destinationPort}
              </strong>
              <span className="text-[10px] font-mono text-[#B99A5B] font-semibold">{vessel.eta}</span>
            </div>

            <div className="border border-[#CBD5E1] p-3 bg-[#FAFBFD]">
              <span className="text-[10px] text-[#64748B] uppercase font-bold block">Demurrage Terms</span>
              <strong className="text-sm font-mono font-bold text-[#B99A5B] tabular-nums mt-0.5 block">
                ${vessel.demurrageDailyRateUSD.toLocaleString()} / day
              </strong>
              <span className="text-[10px] text-[#64748B]">Laytime: 5 WWD SHINC</span>
            </div>
          </div>

          <div className="border border-[#CBD5E1] p-4 bg-[#F4F5F7] space-y-2">
            <div className="text-[10px] uppercase font-bold text-[#10243A] tracking-wider">
              Maritime Compliance &amp; Bunker Index
            </div>
            <p className="text-[11px] text-[#64748B]">
              Operating under Baltic and International Maritime Council (BIMCO) Charter Party standards. Continuous satellite AIS position reporting and weather routing active.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center">
          <button
            onClick={() => {
              alert(`Bill of Lading manifest ${vessel.billOfLadingRef} verified with Master of ${vessel.vesselName}.`);
            }}
            className="h-10 px-5 bg-white border border-[#CBD5E1] hover:bg-[#F4F5F7] text-[#10243A] text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Download Shipping Manifest
          </button>
          <button
            onClick={onClose}
            className="h-10 px-6 bg-[#10243A] hover:bg-[#1E293B] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
