import React, { useState } from 'react';
import { StorageFacility } from '../types.ts';
import { ASSET_IMAGES } from '../data/mockData.ts';

interface SiloInventoryProps {
  facilities: StorageFacility[];
}

export const SiloInventory: React.FC<SiloInventoryProps> = ({ facilities }) => {
  const [selectedFacility, setSelectedFacility] = useState<StorageFacility>(facilities[0]);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [transferTonnage, setTransferTonnage] = useState<number>(5000);
  const [transferTarget, setTransferTarget] = useState<string>('Rotterdam Europort Terminal Silo 7');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const totalNetworkCapacity = facilities.reduce((sum, f) => sum + f.totalCapacityMT, 0);
  const totalNetworkStock = facilities.reduce((sum, f) => sum + f.currentStockMT, 0);
  const avgUtilization = (totalNetworkStock / totalNetworkCapacity) * 100;

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessNotice(
      `Warehouse Warrant Transfer of ${transferTonnage.toLocaleString()} MT from ${selectedFacility.facilityName} to ${transferTarget} successfully endorsed and registered under GAFTA Rule 125.`
    );
    setTransferModalOpen(false);
    setTimeout(() => setSuccessNotice(null), 7000);
  };

  return (
    <div className="space-y-6">
      {/* Success Notification Alert */}
      {successNotice && (
        <div className="bg-[#FAFBFD] border border-[#B99A5B] p-4 text-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#B99A5B]"></div>
            <div>
              <strong className="text-[#10243A] uppercase tracking-wider font-bold">Warrant Endorsement Registered: </strong>
              <span className="text-[#1E293B]">{successNotice}</span>
            </div>
          </div>
          <button
            onClick={() => setSuccessNotice(null)}
            className="text-[#64748B] hover:text-[#10243A] font-bold text-sm px-2 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Hero Visual Banner: Grain Silo Complex & Commercial Inspection Lab */}
      <div className="border border-[#CBD5E1] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 relative bg-[#10243A] min-h-[260px] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[#CBD5E1]">
            <img
              src={ASSET_IMAGES.grainSiloFacility}
              alt="Industrial corrugated grain storage silos and distribution terminal"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10243A]/90 via-[#10243A]/30 to-transparent flex flex-col justify-end p-5">
              <div className="inline-block bg-[#B99A5B] text-[#10243A] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 w-fit">
                Terminal Infrastructure Assets
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight mt-1.5">
                Bulk Grain Silos &amp; Deepwater Storage
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Institutional grain elevators, bonded terminal silos, and deep-draft export berths.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative bg-[#10243A] min-h-[260px] flex items-center justify-center overflow-hidden">
            <img
              src={ASSET_IMAGES.inspectionLab}
              alt="Certified commodity inspection laboratory"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10243A]/90 via-[#10243A]/30 to-transparent flex flex-col justify-end p-5">
              <div className="inline-block bg-white text-[#10243A] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 w-fit">
                GAFTA / SGS Certified Testing
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mt-1.5">
                Analytical Grade Quality Assurance
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Continuous moisture, protein, foreign matter, and falling number certification.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Network Capacity Ledger Strip */}
      <div className="border border-[#CBD5E1] bg-white p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#10243A]">
              Terminal Silo Network Capacity &amp; Certified Stock Balance
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Live inventory positions verified by SGS, Bureau Veritas, and Control Union
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTransferModalOpen(true)}
              className="h-10 px-5 bg-[#10243A] hover:bg-[#1E293B] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border border-[#10243A]"
            >
              + Issue Warehouse Warrant
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="border border-[#E2E8F0] p-4 bg-[#FAFBFD]">
            <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
              Total Storage Capacity
            </div>
            <div className="text-2xl font-bold text-[#10243A] tabular-nums mt-1">
              {totalNetworkCapacity.toLocaleString()} MT
            </div>
            <div className="text-[11px] text-[#64748B] mt-1">Across 3 Deepwater Terminals</div>
          </div>

          <div className="border border-[#E2E8F0] p-4 bg-[#FAFBFD]">
            <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
              Current Certified Physical Stocks
            </div>
            <div className="text-2xl font-bold text-[#10243A] tabular-nums mt-1">
              {totalNetworkStock.toLocaleString()} MT
            </div>
            <div className="text-[11px] text-[#64748B] mt-1">
              Valuation: ${( (totalNetworkStock * 320) / 1000000 ).toFixed(1)}M USD (Est.)
            </div>
          </div>

          <div className="border border-[#E2E8F0] p-4 bg-[#FAFBFD]">
            <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
              Network Utilization Rate
            </div>
            <div className="text-2xl font-bold text-[#B99A5B] tabular-nums mt-1">
              {avgUtilization.toFixed(1)}%
            </div>
            <div className="w-full bg-[#E2E8F0] h-2 mt-2">
              <div
                className="bg-[#B99A5B] h-2"
                style={{ width: `${avgUtilization}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => {
          const isSelected = selectedFacility.id === facility.id;
          return (
            <div
              key={facility.id}
              onClick={() => setSelectedFacility(facility)}
              className={`border transition-all cursor-pointer bg-white flex flex-col justify-between ${
                isSelected
                  ? 'border-[#10243A] shadow-none ring-1 ring-[#10243A]'
                  : 'border-[#CBD5E1] hover:border-slate-400'
              }`}
            >
              <div>
                <div className="bg-[#F4F5F7] px-4 py-3 border-b border-[#CBD5E1] flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#10243A]">
                    {facility.facilityType}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">
                    Berth Draft: {facility.berthDepthMeters}m
                  </span>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-[#10243A]">{facility.facilityName}</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">{facility.location}</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#64748B]">Current Fill Level:</span>
                      <strong className="text-[#10243A] tabular-nums">
                        {facility.currentStockMT.toLocaleString()} / {facility.totalCapacityMT.toLocaleString()} MT
                      </strong>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-2">
                      <div
                        className="bg-[#10243A] h-2"
                        style={{ width: `${facility.utilizationPct}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-[10px] font-mono text-[#64748B]">
                      {facility.utilizationPct.toFixed(1)}% Capacity
                    </div>
                  </div>

                  {/* Commodities stored breakdown */}
                  <div className="border border-[#E2E8F0] p-3 bg-[#FAFBFD] space-y-2 text-xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] block">
                      Certified Lot Stocks
                    </span>
                    {facility.commoditiesStored.map((c) => (
                      <div key={c.name} className="flex items-center justify-between border-b border-[#E2E8F0] pb-1.5 last:border-0 last:pb-0">
                        <div>
                          <div className="font-semibold text-[#10243A] truncate max-w-[180px]">{c.name}</div>
                          <div className="text-[10px] text-[#64748B]">{c.certifiedGrade} · {c.moisturePct}% H₂O</div>
                        </div>
                        <span className="font-mono font-bold text-[#10243A] tabular-nums">
                          {c.stockMT.toLocaleString()} MT
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Telemetry Sensor Readings */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="border border-[#E2E8F0] p-2 bg-white">
                      <span className="text-[10px] text-[#64748B] uppercase tracking-wider block">Temp (Core)</span>
                      <strong className="text-[#10243A] tabular-nums">{facility.temperatureC}°C</strong>
                    </div>
                    <div className="border border-[#E2E8F0] p-2 bg-white">
                      <span className="text-[10px] text-[#64748B] uppercase tracking-wider block">Relative Humidity</span>
                      <strong className="text-[#10243A] tabular-nums">{facility.humidityPct}% RH</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FAFBFD] border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span>Insp: {facility.lastInspectionDate}</span>
                <span className="text-[#B99A5B] font-semibold uppercase tracking-wider">GAFTA Approved</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Warehouse Warrant Issue Dialog Modal */}
      {transferModalOpen && (
        <div className="fixed inset-0 bg-[#10243A]/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#10243A] max-w-lg w-full p-6 space-y-5">
            <div className="border-b border-[#CBD5E1] pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B99A5B]">
                  GAFTA Rule 125 Endorsement
                </span>
                <h3 className="text-lg font-bold text-[#10243A]">Issue Warehouse Warrant Release</h3>
              </div>
              <button
                onClick={() => setTransferModalOpen(false)}
                className="text-slate-500 hover:text-slate-900 font-bold text-xl cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleExecuteTransfer} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
                  Origin Terminal Facility
                </label>
                <div className="p-2.5 bg-[#F4F5F7] border border-[#CBD5E1] font-semibold text-[#10243A]">
                  {selectedFacility.facilityName}
                </div>
              </div>

              <div>
                <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
                  Destination Silo / Berth Facility
                </label>
                <select
                  value={transferTarget}
                  onChange={(e) => setTransferTarget(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] focus:outline-none focus:border-[#10243A]"
                >
                  {facilities
                    .filter((f) => f.id !== selectedFacility.id)
                    .map((f) => (
                      <option key={f.id} value={f.facilityName}>
                        {f.facilityName} ({f.location})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
                  Tonnage to Transfer / Warrant Endorse (MT)
                </label>
                <input
                  type="number"
                  min={100}
                  max={50000}
                  step={500}
                  value={transferTonnage}
                  onChange={(e) => setTransferTonnage(Number(e.target.value))}
                  className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs font-mono text-[#1E293B] focus:outline-none focus:border-[#10243A]"
                />
              </div>

              <div className="bg-[#FAFBFD] border border-[#CBD5E1] p-3 text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Inspection Authority:</span>
                  <strong className="text-[#10243A]">{selectedFacility.inspectorName}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Warrant Registry Fee:</span>
                  <strong className="text-[#10243A] tabular-nums">$1,250.00 USD</strong>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setTransferModalOpen(false)}
                  className="flex-1 h-10 bg-white border border-[#CBD5E1] hover:bg-[#F4F5F7] text-[#10243A] font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 bg-[#B99A5B] hover:bg-[#a6884c] text-white font-semibold uppercase tracking-wider cursor-pointer border border-[#B99A5B]"
                >
                  Endorse Warrant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
