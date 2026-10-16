import React from 'react';

interface HeaderProps {
  activeScreen: string;
  onSelectScreen: (screen: string) => void;
  onOpenTradeModal: () => void;
  totalTradingVolumeUSD: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onSelectScreen,
  onOpenTradeModal,
  totalTradingVolumeUSD,
}) => {
  const navLinks = [
    { id: 'overview', label: 'Executive Ledger' },
    { id: 'trading', label: 'Physical Trading' },
    { id: 'freight', label: 'Fleet & Logistics' },
    { id: 'inventory', label: 'Silo Terminals' },
    { id: 'settlement', label: 'Contracts & LC' },
  ];

  return (
    <header className="w-full bg-[#10243A] text-white border-b border-[#1E293B] sticky top-0 z-40">
      {/* Universal Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Primary Action) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onSelectScreen('overview')}
          className="text-left flex items-center gap-3 cursor-pointer group shrink-0 focus:outline-none"
        >
          <div className="w-8 h-8 bg-[#B99A5B] flex items-center justify-center font-bold text-[#10243A] text-sm tracking-wider">
            WMK
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white uppercase whitespace-nowrap">
              WMK Corporate Standard
            </span>
            <span className="text-[10px] tracking-widest text-[#B99A5B] font-medium uppercase">
              Wholesale Enterprise Trade
            </span>
          </div>
        </button>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeScreen === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectScreen(link.id)}
                className={`h-16 px-1 flex items-center border-b-2 text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'border-[#B99A5B] text-white font-semibold'
                    : 'border-transparent text-slate-300 hover:text-white hover:border-slate-500'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenTradeModal}
            className="h-10 px-5 bg-[#B99A5B] hover:bg-[#a6884c] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border border-[#B99A5B] whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>+ Execute Trade</span>
          </button>
        </div>
      </div>

      {/* Sub-Header Ledger Strip: Institutional balance indicators */}
      <div className="w-full bg-[#0a1828] border-t border-[#1a2d45] py-2 px-4 sm:px-8 text-xs">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4 text-slate-300">
          <div className="flex items-center gap-6 overflow-x-auto py-0.5">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] uppercase tracking-wider text-slate-400">Total Active Volume:</span>
              <span className="text-white font-semibold tabular-nums">
                ${(totalTradingVolumeUSD / 1000000).toFixed(2)}M USD
              </span>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] uppercase tracking-wider text-slate-400">Charter Fleet:</span>
              <span className="text-white font-semibold tabular-nums">4 Panamax / Capesize</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] uppercase tracking-wider text-slate-400">Terminal Silo Stocks:</span>
              <span className="text-white font-semibold tabular-nums">864,600 MT</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] uppercase tracking-wider text-slate-400">GAFTA / FOSFA Status:</span>
              <span className="text-[#B99A5B] font-semibold uppercase tracking-wider text-[11px]">
                Compliant &amp; Settled
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-[11px] text-slate-400">
            <span>Market Session: <strong className="text-slate-200">London / Geneva / New York</strong></span>
            <span className="tabular-nums">2026-10-16 16:00 UTC</span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Tabs */}
      <div className="lg:hidden w-full bg-[#10243A] border-t border-[#1a2d45] overflow-x-auto flex">
        {navLinks.map((link) => {
          const isActive = activeScreen === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onSelectScreen(link.id)}
              className={`py-2.5 px-4 text-xs whitespace-nowrap shrink-0 border-b-2 font-medium cursor-pointer ${
                isActive
                  ? 'border-[#B99A5B] text-white font-semibold bg-[#162e49]'
                  : 'border-transparent text-slate-300'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
