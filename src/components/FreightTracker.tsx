import React, { useState } from 'react';
import { VesselVoyage } from '../types.ts';
import { ASSET_IMAGES } from '../data/mockData.ts';

interface FreightTrackerProps {
  vessels: VesselVoyage[];
  onSelectVesselDetail: (vessel: VesselVoyage) => void;
}

export const FreightTracker: React.FC<FreightTrackerProps> = ({
  vessels,
  onSelectVesselDetail,
}) => {
  const [selectedVessel, setSelectedVessel] = useState<VesselVoyage>(vessels[0]);
  const [filterClass, setFilterClass] = useState<string>('All');

  const filteredVessels = vessels.filter((v) => {
    if (filterClass === 'All') return true;
    return v.vesselClass === filterClass;
  });

  const totalCharterTonnage = vessels.reduce((acc, v) => acc + v.tonnageMT, 0);
  const totalDailyDemurrage = vessels.reduce((acc, v) => acc + v.demurrageDailyRateUSD, 0);

  return (
    <div className="space-y-6">
      {/* Fleet Hero Banner & Charter Metrics */}
      <div className="border border-[#CBD5E1] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Maritime Logistics Photo */}
          <div className="lg:col-span-5 relative bg-[#10243A] min-h-[240px] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[#CBD5E1]">
            <img
              src={ASSET_IMAGES.cargoVessel}
              alt="Panamax bulk carrier underway in open sea"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10243A]/90 via-[#10243A]/30 to-transparent flex flex-col justify-end p-5">
              <div className="inline-block bg-[#B99A5B] text-[#10243A] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 w-fit">
                Charter Party Fleet Operations
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight mt-1.5">
                Bulk Carrier Logistics &amp; Demurrage Ledger
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Deep-sea bulk dry and breakbulk merchant voyages under Baltic &amp; NYPE standard terms.
              </p>
            </div>
          </div>

          {/* Right Column: Fleet Operational Key Figures */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-white">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="border border-[#E2E8F0] p-3.5 bg-[#FAFBFD]">
                <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                  Active Fleet Tonnage
                </div>
                <div className="text-xl font-bold text-[#10243A] tabular-nums mt-1">
                  {totalCharterTonnage.toLocaleString()} MT
                </div>
                <div className="text-[10px] text-[#64748B] mt-0.5">4 Vessels Under Charter</div>
              </div>

              <div className="border border-[#E2E8F0] p-3.5 bg-[#FAFBFD]">
                <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                  Demurrage Risk Exp.
                </div>
                <div className="text-xl font-bold text-[#10243A] tabular-nums mt-1">
                  ${(totalDailyDemurrage / 1000).toFixed(1)}k/day
                </div>
                <div className="text-[10px] text-[#64748B] mt-0.5">Laytime Monitored</div>
              </div>

              <div className="border border-[#E2E8F0] p-3.5 bg-[#FAFBFD]">
                <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                  Avg Sea Speed
                </div>
                <div className="text-xl font-bold text-[#10243A] tabular-nums mt-1">
                  13.2 kts
                </div>
                <div className="text-[10px] text-[#64748B] mt-0.5">Eco-Steaming Enforced</div>
              </div>

              <div className="border border-[#E2E8F0] p-3.5 bg-[#FAFBFD]">
                <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                  Cargo Discharge SLA
                </div>
                <div className="text-xl font-bold text-[#B99A5B] tabular-nums mt-1">
                  98.4%
                </div>
                <div className="text-[10px] text-[#64748B] mt-0.5">On-Schedule Windows</div>
              </div>
            </div>

            {/* Vessel Class Selector Buttons */}
            <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 border border-[#CBD5E1] p-1 bg-[#F4F5F7]">
                {['All', 'Panamax', 'Capesize', 'Handymax'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setFilterClass(cls)}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      filterClass === cls
                        ? 'bg-[#10243A] text-white'
                        : 'bg-transparent text-[#1E293B] hover:bg-white'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>

              <div className="text-xs text-[#64748B] tabular-nums">
                All voyages tracked via AIS Marine Sat &amp; Lloyd&apos;s Registry
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Vessel Roster Table & Selected Vessel Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Vessel Table */}
        <div className="lg:col-span-8 border border-[#CBD5E1] bg-white overflow-x-auto">
          <div className="bg-[#F4F5F7] px-4 py-3 border-b border-[#CBD5E1] flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#10243A]">
              Active Voyage Manifest &amp; Bill of Lading Ledger
            </span>
            <span className="text-[11px] text-[#64748B] tabular-nums">
              Showing {filteredVessels.length} Chartered Vessels
            </span>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAFBFD] border-b border-[#CBD5E1]">
                <th className="py-2.5 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider">
                  Vessel &amp; IMO
                </th>
                <th className="py-2.5 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider">
                  Class / Flag
                </th>
                <th className="py-2.5 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider">
                  Cargo Manifest
                </th>
                <th className="py-2.5 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider">
                  Route (Load → Disch)
                </th>
                <th className="py-2.5 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider text-right">
                  ETA
                </th>
                <th className="py-2.5 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredVessels.map((v, idx) => {
                const isSelected = selectedVessel.id === v.id;
                const isEven = idx % 2 === 0;
                return (
                  <tr
                    key={v.id}
                    onClick={() => setSelectedVessel(v)}
                    className={`border-b border-[#E2E8F0] cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#EDE4D0]/30 border-l-2 border-l-[#B99A5B]'
                        : isEven
                        ? 'bg-white hover:bg-[#F4F5F7]'
                        : 'bg-[#FAFBFD] hover:bg-[#F4F5F7]'
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-[#10243A]">
                      {v.vesselName}
                      <div className="text-[10px] font-mono text-[#64748B]">{v.imoNumber}</div>
                    </td>

                    <td className="py-3 px-4 text-[#1E293B]">
                      <div>{v.vesselClass}</div>
                      <div className="text-[10px] text-[#64748B]">{v.flag}</div>
                    </td>

                    <td className="py-3 px-4 text-[#1E293B]">
                      <div className="truncate max-w-[160px] font-medium">{v.cargoType}</div>
                      <div className="text-[10px] font-mono text-[#64748B]">{v.billOfLadingRef}</div>
                    </td>

                    <td className="py-3 px-4 text-[#1E293B]">
                      <div className="truncate max-w-[170px]">{v.originPort}</div>
                      <div className="text-[10px] text-[#64748B] truncate">→ {v.destinationPort}</div>
                    </td>

                    <td className="py-3 px-4 text-right tabular-nums">
                      <div className="font-semibold text-[#10243A]">{v.eta.split(' ')[0]}</div>
                      <div className="text-[10px] text-[#64748B]">{v.daysToPort === 0 ? 'In Berth' : `${v.daysToPort} days rem.`}</div>
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {v.status === 'underway' && (
                        <span className="inline-block px-2 py-0.5 bg-[#F4F5F7] text-[#10243A] border border-[#CBD5E1] text-[10px] font-semibold uppercase tracking-wider">
                          Underway
                        </span>
                      )}
                      {v.status === 'discharging' && (
                        <span className="inline-block px-2 py-0.5 bg-[#F4F5F7] text-[#B99A5B] border border-[#B99A5B] text-[10px] font-semibold uppercase tracking-wider">
                          Discharging
                        </span>
                      )}
                      {v.status === 'berthed' && (
                        <span className="inline-block px-2 py-0.5 bg-[#F4F5F7] text-[#10243A] border border-[#B99A5B] text-[10px] font-semibold uppercase tracking-wider">
                          Berthed
                        </span>
                      )}
                      {v.status === 'loading' && (
                        <span className="inline-block px-2 py-0.5 bg-[#F4F5F7] text-amber-800 border border-amber-300 text-[10px] font-semibold uppercase tracking-wider">
                          Loading
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Vessel Inspector Card */}
        <div className="lg:col-span-4 border border-[#CBD5E1] bg-white flex flex-col justify-between">
          <div>
            <div className="bg-[#10243A] text-white p-4 border-b border-[#CBD5E1] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#B99A5B] font-bold">
                  Voyage Specification Sheet
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedVessel.vesselName}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-300">{selectedVessel.vesselClass}</span>
              </div>
            </div>

            <div className="p-4 space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                <span className="text-[#64748B]">Registry &amp; Flag:</span>
                <strong className="text-[#10243A]">{selectedVessel.flag} ({selectedVessel.imoNumber})</strong>
              </div>

              <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                <span className="text-[#64748B]">Bill of Lading:</span>
                <span className="font-mono text-[#10243A] font-semibold">{selectedVessel.billOfLadingRef}</span>
              </div>

              <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                <span className="text-[#64748B]">Cargo Quantity:</span>
                <strong className="text-[#10243A] tabular-nums">{selectedVessel.tonnageMT.toLocaleString()} Metric Tons</strong>
              </div>

              <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                <span className="text-[#64748B]">Current Coordinates:</span>
                <span className="font-mono text-[#10243A]">{selectedVessel.coordinates}</span>
              </div>

              <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                <span className="text-[#64748B]">Operational Draft:</span>
                <strong className="text-[#10243A] tabular-nums">{selectedVessel.draftMeters.toFixed(1)} meters</strong>
              </div>

              <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                <span className="text-[#64748B]">Demurrage Clause:</span>
                <strong className="text-[#B99A5B] font-mono tabular-nums">${selectedVessel.demurrageDailyRateUSD.toLocaleString()} / day</strong>
              </div>

              <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                <span className="text-[#64748B]">Bunker Consumption:</span>
                <span className="text-[#10243A] tabular-nums font-mono">{selectedVessel.bunkerConsumptionMTDay} MT VLSFO/day</span>
              </div>

              <div className="bg-[#F4F5F7] border border-[#CBD5E1] p-3 mt-3">
                <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">
                  Voyage Destination &amp; Discharge Window
                </div>
                <div className="text-xs font-semibold text-[#10243A] mt-1">
                  {selectedVessel.destinationPort}
                </div>
                <div className="text-[11px] text-[#1E293B] tabular-nums mt-0.5">
                  Scheduled Arrival: {selectedVessel.eta}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-[#E2E8F0] bg-[#FAFBFD] flex gap-2">
            <button
              onClick={() => onSelectVesselDetail(selectedVessel)}
              className="flex-1 h-10 bg-[#10243A] hover:bg-[#1E293B] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer border border-[#10243A]"
            >
              Full Voyage Log
            </button>
            <button
              onClick={() => {
                alert(`Official Bill of Lading for ${selectedVessel.vesselName} (${selectedVessel.billOfLadingRef}) ready for verified maritime release.`);
              }}
              className="px-4 h-10 bg-white border border-[#CBD5E1] hover:bg-[#F4F5F7] text-[#10243A] text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Print B/L
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
