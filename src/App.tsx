/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { ExecutiveDashboard } from './components/ExecutiveDashboard.tsx';
import { TradingDesk } from './components/TradingDesk.tsx';
import { FreightTracker } from './components/FreightTracker.tsx';
import { SiloInventory } from './components/SiloInventory.tsx';
import { SettlementLedger } from './components/SettlementLedger.tsx';
import { ExecuteTradeModal } from './components/ExecuteTradeModal.tsx';
import { GaftaSlipModal } from './components/GaftaSlipModal.tsx';
import { QualitySpecsDrawer } from './components/QualitySpecsDrawer.tsx';
import { VesselDetailModal } from './components/VesselDetailModal.tsx';

import {
  INITIAL_CONTRACTS,
  INITIAL_VESSELS,
  INITIAL_FACILITIES,
  INITIAL_SETTLEMENTS,
  INITIAL_MARKET_QUOTES,
} from './data/mockData.ts';
import { CommodityContract, VesselVoyage } from './types.ts';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<string>('overview');
  const [contracts, setContracts] = useState<CommodityContract[]>(INITIAL_CONTRACTS);
  const [vessels] = useState<VesselVoyage[]>(INITIAL_VESSELS);
  const [facilities] = useState(INITIAL_FACILITIES);
  const [settlements, setSettlements] = useState(INITIAL_SETTLEMENTS);
  const [quotes] = useState(INITIAL_MARKET_QUOTES);

  // Modals state
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [gaftaSlipContract, setGaftaSlipContract] = useState<CommodityContract | null>(null);
  const [specsContract, setSpecsContract] = useState<CommodityContract | null>(null);
  const [vesselDetail, setVesselDetail] = useState<VesselVoyage | null>(null);

  // Trade submission handler
  const handleExecuteNewTrade = (newContract: CommodityContract) => {
    setContracts((prev) => [newContract, ...prev]);

    // Also register corresponding settlement record
    setSettlements((prev) => [
      {
        id: `SET-AUT-${Math.floor(100 + Math.random() * 900)}`,
        contractRef: newContract.id,
        counterparty: newContract.counterparty,
        commodity: `${newContract.commodity} (${newContract.quantityMT.toLocaleString()} MT)`,
        issuingBank: 'BNP Paribas Commodity Finance Paris',
        lcNumber: `LC-BNP-${Math.floor(100000 + Math.random() * 900000)}-CH`,
        lcAmountUSD: newContract.totalValueUSD,
        collateralMarginPct: 100,
        paymentTerms: newContract.paymentTerms,
        status: 'escrow_funded',
        arbitrationRules: newContract.arbitration,
        issueDate: newContract.tradeDate,
        maturityDate: '2026-12-31',
      },
      ...prev,
    ]);

    // Switch to trading screen so user immediately sees their executed contract
    setActiveScreen('trading');
  };

  // Settlement release handler
  const handleSettleAgreement = (agreementId: string) => {
    setSettlements((prev) =>
      prev.map((s) => (s.id === agreementId ? { ...s, status: 'released' } : s))
    );
  };

  // View GAFTA slip by contract ref
  const handleViewGaftaSlipByRef = (contractRef: string) => {
    const found = contracts.find((c) => c.id === contractRef || c.tradeRef === contractRef);
    if (found) {
      setGaftaSlipContract(found);
    } else {
      // Default to first contract if not directly matched
      setGaftaSlipContract(contracts[0]);
    }
  };

  const totalTradingVolumeUSD = contracts.reduce((sum, c) => sum + c.totalValueUSD, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#1E293B] flex flex-col font-sans selection:bg-[#B99A5B] selection:text-white">
      {/* Universal Top Bar Header */}
      <Header
        activeScreen={activeScreen}
        onSelectScreen={setActiveScreen}
        onOpenTradeModal={() => setTradeModalOpen(true)}
        totalTradingVolumeUSD={totalTradingVolumeUSD}
      />

      {/* Main Content Workspace Canvas */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-8">
        {activeScreen === 'overview' && (
          <ExecutiveDashboard
            contracts={contracts}
            vessels={vessels}
            facilities={facilities}
            quotes={quotes}
            onNavigate={setActiveScreen}
            onOpenTradeModal={() => setTradeModalOpen(true)}
          />
        )}

        {activeScreen === 'trading' && (
          <TradingDesk
            contracts={contracts}
            quotes={quotes}
            onOpenTradeModal={() => setTradeModalOpen(true)}
            onViewGaftaSlip={(c) => setGaftaSlipContract(c)}
            onSelectContractSpecs={(c) => setSpecsContract(c)}
          />
        )}

        {activeScreen === 'freight' && (
          <FreightTracker
            vessels={vessels}
            onSelectVesselDetail={(v) => setVesselDetail(v)}
          />
        )}

        {activeScreen === 'inventory' && (
          <SiloInventory facilities={facilities} />
        )}

        {activeScreen === 'settlement' && (
          <SettlementLedger
            settlements={settlements}
            contracts={contracts}
            onSettleAgreement={handleSettleAgreement}
            onViewGaftaSlipByContractRef={handleViewGaftaSlipByRef}
          />
        )}
      </main>

      {/* Institutional Corporate Footer */}
      <footer className="w-full bg-[#10243A] text-white border-t border-[#1E293B] py-10 px-4 sm:px-8 mt-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#B99A5B] flex items-center justify-center font-bold text-[#10243A] text-xs">
                WMK
              </div>
              <span className="font-bold tracking-tight uppercase text-sm">WMK Corporate Standard</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Institutional wholesale merchant operations, agricultural bulk supply chain logistics, and physical trade settlement architecture.
            </p>
            <div className="mt-3 text-[11px] text-[#B99A5B] font-mono">
              LEI: 549300WMKCORP001923
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-300 block mb-3">
              Trading Desks &amp; Physical Hubs
            </span>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li><strong>Geneva:</strong> Rue du Rhône 42, 1204 Genève</li>
              <li><strong>London:</strong> 30 St Mary Axe, EC3A 8EP</li>
              <li><strong>Singapore:</strong> Marina Bay Financial Tower 2</li>
              <li><strong>New York:</strong> 200 Park Avenue, NY 10166</li>
            </ul>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-300 block mb-3">
              Governing Standards &amp; Codes
            </span>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>GAFTA Form 119 &amp; 124 (London)</li>
              <li>FOSFA International Contract 54</li>
              <li>ICC Incoterms® 2020 Registered</li>
              <li>BIMCO NYPE 93 Charter Party Standard</li>
            </ul>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-300 block mb-3">
              Regulatory Disclosures
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              All physical trade confirmations and documentary letters of credit are subject to UCP 600 banking rules. Past tonnage performance and vessel schedules are indicative under maritime charter law.
            </p>
            <div className="mt-3 text-[10px] text-slate-500">
              © {new Date().getFullYear()} WMK Merchant Capital AG. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ExecuteTradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
        onSubmitTrade={handleExecuteNewTrade}
      />

      <GaftaSlipModal
        contract={gaftaSlipContract}
        onClose={() => setGaftaSlipContract(null)}
      />

      <QualitySpecsDrawer
        contract={specsContract}
        onClose={() => setSpecsContract(null)}
      />

      <VesselDetailModal
        vessel={vesselDetail}
        onClose={() => setVesselDetail(null)}
      />
    </div>
  );
}
