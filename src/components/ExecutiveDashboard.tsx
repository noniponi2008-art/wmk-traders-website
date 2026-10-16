import React from 'react';
import { CommodityContract, VesselVoyage, StorageFacility, MarketQuote } from '../types.ts';
import { ASSET_IMAGES } from '../data/mockData.ts';

interface ExecutiveDashboardProps {
  contracts: CommodityContract[];
  vessels: VesselVoyage[];
  facilities: StorageFacility[];
  quotes: MarketQuote[];
  onNavigate: (screen: string) => void;
  onOpenTradeModal: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  contracts,
  vessels,
  facilities,
  quotes,
  onNavigate,
  onOpenTradeModal,
}) => {
  const totalPhysicalValue = contracts.reduce((sum, c) => sum + c.totalValueUSD, 0);
  const totalTonnageContracted = contracts.reduce((sum, c) => sum + c.quantityMT, 0);
  const totalCharterTonnage = vessels.reduce((sum, v) => sum + v.tonnageMT, 0);
  const totalStockSilos = facilities.reduce((sum, f) => sum + f.currentStockMT, 0);

  return (
    <div className="space-y-6">
      {/* Hero Terminal Asset Showcase */}
      <div className="border border-[#CBD5E1] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 relative bg-[#10243A] min-h-[300px] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[#CBD5E1]">
            <img
              src={ASSET_IMAGES.deepwaterTerminal}
              alt="Deepwater bulk commodity export terminal at twilight"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10243A]/95 via-[#10243A]/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <div className="inline-block bg-[#B99A5B] text-[#10243A] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 w-fit">
                WMK Corporate Standard · Institutional Merchant Platform
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2 text-balance">
                Wholesale Enterprise Trade &amp; Bulk Commodity Operations
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                Global balance sheet oversight across physical grain elevators, refined metals, maritime charter party vessels, and syndicated bank documentary collections.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenTradeModal}
                  className="h-10 px-6 bg-[#B99A5B] hover:bg-[#a6884c] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer border border-[#B99A5B] transition-colors"
                >
                  Execute Trade Order
                </button>
                <button
                  onClick={() => onNavigate('trading')}
                  className="h-10 px-5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer border border-white/30 backdrop-blur-none transition-colors"
                >
                  View Physical Ledgers
                </button>
              </div>
            </div>
          </div>

          {/* Institutional KPI Matrix */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-white space-y-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold">
                Solvency &amp; Position Overview
              </div>
              <h3 className="text-lg font-bold text-[#10243A] mt-0.5">
                Consolidated Trading Balance Sheet
              </h3>
            </div>

            <div className="space-y-3">
              <div className="border border-[#E2E8F0] p-3.5 bg-[#FAFBFD] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold block">
                    Active Contracts Volume
                  </span>
                  <div className="text-xl font-bold text-[#10243A] tabular-nums mt-0.5">
                    ${(totalPhysicalValue / 1000000).toFixed(2)}M USD
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#10243A] tabular-nums">
                    {totalTonnageContracted.toLocaleString()} MT
                  </span>
                  <span className="text-[10px] text-[#64748B] block">GAFTA / FOSFA</span>
                </div>
              </div>

              <div className="border border-[#E2E8F0] p-3.5 bg-[#FAFBFD] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold block">
                    Physical Silo Inventory
                  </span>
                  <div className="text-xl font-bold text-[#10243A] tabular-nums mt-0.5">
                    {totalStockSilos.toLocaleString()} MT
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#B99A5B] tabular-nums">
                    3 Deepwater Hubs
                  </span>
                  <span className="text-[10px] text-[#64748B] block">SGS Certified</span>
                </div>
              </div>

              <div className="border border-[#E2E8F0] p-3.5 bg-[#FAFBFD] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold block">
                    Ocean Cargo Under Charter
                  </span>
                  <div className="text-xl font-bold text-[#10243A] tabular-nums mt-0.5">
                    {totalCharterTonnage.toLocaleString()} MT
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800 tabular-nums">
                    4 Vessels Underway
                  </span>
                  <span className="text-[10px] text-[#64748B] block">Zero Demurrage Breach</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
              <span>Credit Line Headroom:</span>
              <strong className="text-[#10243A] font-mono tabular-nums">$111.8M Available</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Routing Shortcut Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('trading')}
          className="border border-[#CBD5E1] bg-white p-5 cursor-pointer hover:border-[#10243A] transition-all group"
        >
          <div className="text-[10px] font-bold text-[#B99A5B] uppercase tracking-wider">
            Screen 01
          </div>
          <h4 className="text-sm font-bold text-[#10243A] group-hover:text-[#B99A5B] transition-colors mt-1">
            Physical Trading Desk
          </h4>
          <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2">
            Spot bids, forward grain &amp; metals contracts, FOB/CIF differentials, quality tolerances.
          </p>
          <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#10243A]">
            <span>{contracts.length} Active Lots</span>
            <span className="text-sm">→</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('freight')}
          className="border border-[#CBD5E1] bg-white p-5 cursor-pointer hover:border-[#10243A] transition-all group"
        >
          <div className="text-[10px] font-bold text-[#B99A5B] uppercase tracking-wider">
            Screen 02
          </div>
          <h4 className="text-sm font-bold text-[#10243A] group-hover:text-[#B99A5B] transition-colors mt-1">
            Fleet &amp; Freight Tracker
          </h4>
          <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2">
            Panamax and Capesize vessel charters, Bill of Lading manifests, and port laytime demurrage.
          </p>
          <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#10243A]">
            <span>4 Chartered Vessels</span>
            <span className="text-sm">→</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('inventory')}
          className="border border-[#CBD5E1] bg-white p-5 cursor-pointer hover:border-[#10243A] transition-all group"
        >
          <div className="text-[10px] font-bold text-[#B99A5B] uppercase tracking-wider">
            Screen 03
          </div>
          <h4 className="text-sm font-bold text-[#10243A] group-hover:text-[#B99A5B] transition-colors mt-1">
            Silo Terminals &amp; Storage
          </h4>
          <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2">
            Export elevator capacity, SGS laboratory quality inspections, and GAFTA warrant issuance.
          </p>
          <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#10243A]">
            <span>3 Deepwater Hubs</span>
            <span className="text-sm">→</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('settlement')}
          className="border border-[#CBD5E1] bg-white p-5 cursor-pointer hover:border-[#10243A] transition-all group"
        >
          <div className="text-[10px] font-bold text-[#B99A5B] uppercase tracking-wider">
            Screen 04
          </div>
          <h4 className="text-sm font-bold text-[#10243A] group-hover:text-[#B99A5B] transition-colors mt-1">
            Settlement &amp; LC Ledger
          </h4>
          <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2">
            Documentary letters of credit, UCP 600 compliance, escrow release, and GAFTA confirmations.
          </p>
          <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#10243A]">
            <span>$500M Facility</span>
            <span className="text-sm">→</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Geographic Risk Exposure & Live Commodity Quotes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Geographic Trade Exposure */}
        <div className="lg:col-span-7 border border-[#CBD5E1] bg-white">
          <div className="bg-[#F4F5F7] px-4 py-3 border-b border-[#CBD5E1] flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#10243A]">
              Bilateral Merchant Exposure by Maritime Trade Lane
            </span>
            <span className="text-[11px] text-[#64748B] font-mono">Q4 2026 Active Books</span>
          </div>

          <div className="p-4 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#10243A]">North America US Gulf → North Africa &amp; Med</span>
                <span className="font-mono text-[#10243A] tabular-nums font-bold">$17,070,000 USD (60,000 MT)</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2">
                <div className="bg-[#10243A] h-2" style={{ width: '38%' }}></div>
              </div>
              <div className="text-[10px] text-[#64748B]">Origin: Port of New Orleans · Destination: Alexandria</div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#10243A]">South America (Paranaguá / Santos) → China Far East</span>
                <span className="font-mono text-[#10243A] tabular-nums font-bold">$44,538,000 USD (111,000 MT)</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2">
                <div className="bg-[#B99A5B] h-2" style={{ width: '74%' }}></div>
              </div>
              <div className="text-[10px] text-[#64748B]">Origin: Paranaguá · Destination: Qingdao &amp; Santos</div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#10243A]">South America Pacific (Chile) → Northwest Europe (ARA)</span>
                <span className="font-mono text-[#10243A] tabular-nums font-bold">$23,700,000 USD (2,500 MT Cu)</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2">
                <div className="bg-[#10243A] h-2" style={{ width: '45%' }}></div>
              </div>
              <div className="text-[10px] text-[#64748B]">Origin: Antofagasta · Destination: Rotterdam Europort</div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#10243A]">Australia (Queensland) → East Asia (South Korea)</span>
                <span className="font-mono text-[#10243A] tabular-nums font-bold">$19,360,000 USD (80,000 MT)</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2">
                <div className="bg-[#64748B] h-2" style={{ width: '40%' }}></div>
              </div>
              <div className="text-[10px] text-[#64748B]">Origin: Hay Point · Destination: Pohang Pier</div>
            </div>
          </div>
        </div>

        {/* Live Market Indications */}
        <div className="lg:col-span-5 border border-[#CBD5E1] bg-white flex flex-col justify-between">
          <div>
            <div className="bg-[#F4F5F7] px-4 py-3 border-b border-[#CBD5E1] flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#10243A]">
                Commodity Spot Indications
              </span>
              <span className="text-[11px] text-[#64748B]">Phys. Settled</span>
            </div>

            <div className="divide-y divide-[#E2E8F0]">
              {quotes.map((q) => {
                const isPos = q.change24h >= 0;
                return (
                  <div key={q.symbol} className="p-3.5 flex items-center justify-between hover:bg-[#FAFBFD] transition-colors">
                    <div>
                      <div className="text-xs font-bold text-[#10243A]">{q.name}</div>
                      <div className="text-[10px] font-mono text-[#64748B]">{q.symbol} · {q.unit}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#10243A] tabular-nums">
                        ${q.spotPrice.toFixed(2)}
                      </div>
                      <div
                        className={`text-[10px] font-semibold tabular-nums ${
                          isPos ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {isPos ? '+' : ''}
                        {q.change24h.toFixed(2)} ({isPos ? '+' : ''}
                        {q.change24hPct.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 bg-[#FAFBFD] border-t border-[#E2E8F0] text-center">
            <button
              onClick={() => onNavigate('trading')}
              className="text-xs font-semibold text-[#10243A] hover:text-[#B99A5B] uppercase tracking-wider transition-colors"
            >
              Open Full Trading Blotter →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
