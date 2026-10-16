import React, { useState } from 'react';
import { CommodityContract, CommoditySector, Incoterm } from '../types.ts';

interface ExecuteTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTrade: (newContract: CommodityContract) => void;
}

export const ExecuteTradeModal: React.FC<ExecuteTradeModalProps> = ({
  isOpen,
  onClose,
  onSubmitTrade,
}) => {
  const [commodity, setCommodity] = useState('Hard Red Winter Wheat #2');
  const [sector, setSector] = useState<CommoditySector>('Grains & Oilseeds');
  const [grade, setGrade] = useState('US Grade No. 2 (12.0% Protein min)');
  const [originPort, setOriginPort] = useState('Port of New Orleans (USG)');
  const [destinationPort, setDestinationPort] = useState('Alexandria Port, Egypt');
  const [incoterm, setIncoterm] = useState<Incoterm>('CIF');
  const [quantityMT, setQuantityMT] = useState(55000);
  const [unitPriceUSD, setUnitPriceUSD] = useState(285.0);
  const [counterparty, setCounterparty] = useState('ADM Grain International / GASC');
  const [arbitration, setArbitration] = useState<'GAFTA 119' | 'FOSFA 54' | 'Incoterms 2020'>('GAFTA 119');
  const [paymentTerms, setPaymentTerms] = useState('100% Irrevocable Documentary LC at sight');

  if (!isOpen) return null;

  const totalNotionalUSD = quantityMT * unitPriceUSD;
  const initialMarginUSD = totalNotionalUSD * 0.1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newContract: CommodityContract = {
      id: `CTR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      tradeRef: `WMK-PHY-${Math.floor(80000 + Math.random() * 19999)}`,
      commodity,
      sector,
      grade,
      originPort,
      destinationPort,
      incoterm,
      quantityMT,
      unitPriceUSD,
      totalValueUSD: totalNotionalUSD,
      counterparty,
      status: 'pending',
      tradeDate: new Date().toISOString().slice(0, 10),
      deliveryWindow: '15 Nov – 05 Dec 2026',
      qualitySpecs: {
        moisturePct: 12.0,
        proteinPct: 12.5,
        testWeightKgHl: 78.5,
        foreignMatterPct: 0.8,
      },
      arbitration,
      paymentTerms,
    };

    onSubmitTrade(newContract);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#10243A]/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#10243A] max-w-2xl w-full p-6 space-y-5 my-8">
        {/* Modal Header */}
        <div className="border-b border-[#CBD5E1] pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B99A5B]">
              Institutional Trade Execution
            </span>
            <h3 className="text-lg font-bold text-[#10243A]">
              Issue Bilateral Physical Commodity Contract
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 font-bold text-xl cursor-pointer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Commodity & Sector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
                Commodity Name
              </label>
              <input
                type="text"
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                required
                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] focus:outline-none focus:border-[#10243A]"
              />
            </div>

            <div>
              <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
                Sector Classification
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value as CommoditySector)}
                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] focus:outline-none focus:border-[#10243A]"
              >
                <option value="Grains & Oilseeds">Grains &amp; Oilseeds</option>
                <option value="Industrial Metals">Industrial Metals</option>
                <option value="Fertilizers">Fertilizers</option>
                <option value="Energy & Petrochem">Energy &amp; Petrochem</option>
              </select>
            </div>
          </div>

          {/* Grade Specification */}
          <div>
            <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
              Commercial Grade &amp; Quality Parameters
            </label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
              className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] focus:outline-none focus:border-[#10243A]"
            />
          </div>

          {/* Ports & Incoterms */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
                Port of Origin
              </label>
              <input
                type="text"
                value={originPort}
                onChange={(e) => setOriginPort(e.target.value)}
                required
                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] focus:outline-none focus:border-[#10243A]"
              />
            </div>

            <div>
              <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
                Destination Port
              </label>
              <input
                type="text"
                value={destinationPort}
                onChange={(e) => setDestinationPort(e.target.value)}
                required
                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] focus:outline-none focus:border-[#10243A]"
              />
            </div>

            <div>
              <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
                Incoterm 2020
              </label>
              <select
                value={incoterm}
                onChange={(e) => setIncoterm(e.target.value as Incoterm)}
                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] focus:outline-none focus:border-[#10243A]"
              >
                <option value="CIF">CIF (Cost, Insurance &amp; Freight)</option>
                <option value="FOB">FOB (Free On Board)</option>
                <option value="CFR">CFR (Cost &amp; Freight)</option>
                <option value="DAP">DAP (Delivered At Place)</option>
              </select>
            </div>
          </div>

          {/* Quantity & Unit Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
                Contract Quantity (Metric Tons)
              </label>
              <input
                type="number"
                min={100}
                max={500000}
                step={500}
                value={quantityMT}
                onChange={(e) => setQuantityMT(Number(e.target.value))}
                required
                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs font-mono text-[#1E293B] focus:outline-none focus:border-[#10243A]"
              />
            </div>

            <div>
              <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
                Contract Unit Price (USD / MT)
              </label>
              <input
                type="number"
                min={1}
                max={50000}
                step={0.25}
                value={unitPriceUSD}
                onChange={(e) => setUnitPriceUSD(Number(e.target.value))}
                required
                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs font-mono text-[#1E293B] focus:outline-none focus:border-[#10243A]"
              />
            </div>
          </div>

          {/* Counterparty & Arbitration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
                Counterparty Entity
              </label>
              <input
                type="text"
                value={counterparty}
                onChange={(e) => setCounterparty(e.target.value)}
                required
                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] focus:outline-none focus:border-[#10243A]"
              />
            </div>

            <div>
              <label className="block text-[#64748B] uppercase tracking-wider font-semibold mb-1">
                Standard Arbitration Clause
              </label>
              <select
                value={arbitration}
                onChange={(e) =>
                  setArbitration(e.target.value as 'GAFTA 119' | 'FOSFA 54' | 'Incoterms 2020')
                }
                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] focus:outline-none focus:border-[#10243A]"
              >
                <option value="GAFTA 119">GAFTA Form 119 (Grain / Feeds in Bulk)</option>
                <option value="FOSFA 54">FOSFA Form 54 (Vegetable &amp; Marine Oils)</option>
                <option value="Incoterms 2020">Incoterms 2020 / ICC Arbitration</option>
              </select>
            </div>
          </div>

          {/* Financial Calculation Box */}
          <div className="bg-[#FAFBFD] border border-[#CBD5E1] p-4 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#64748B]">Total Contract Value (Notional):</span>
              <strong className="text-base font-bold text-[#10243A] font-mono tabular-nums">
                ${totalNotionalUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
              </strong>
            </div>

            <div className="flex justify-between items-center text-xs border-t border-[#E2E8F0] pt-2">
              <span className="text-[#64748B]">Required Margin Collateral (10%):</span>
              <strong className="text-xs font-semibold text-[#B99A5B] font-mono tabular-nums">
                ${initialMarginUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
              </strong>
            </div>

            <div className="flex justify-between items-center text-[11px] text-[#64748B]">
              <span>Settlement Mechanism:</span>
              <span className="font-medium text-[#10243A]">{paymentTerms}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 bg-white border border-[#CBD5E1] hover:bg-[#F4F5F7] text-[#10243A] font-semibold uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 bg-[#B99A5B] hover:bg-[#a6884c] text-white font-semibold uppercase tracking-wider cursor-pointer border border-[#B99A5B]"
            >
              Execute Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
