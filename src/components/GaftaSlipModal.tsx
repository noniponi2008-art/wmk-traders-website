import React from 'react';
import { CommodityContract } from '../types.ts';

interface GaftaSlipModalProps {
  contract: CommodityContract | null;
  onClose: () => void;
}

export const GaftaSlipModal: React.FC<GaftaSlipModalProps> = ({ contract, onClose }) => {
  if (!contract) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-[#10243A]/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#10243A] max-w-3xl w-full p-6 sm:p-8 space-y-6 my-8 print:p-0 print:border-none">
        {/* Document Header */}
        <div className="border-b-2 border-[#10243A] pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#10243A] text-white flex items-center justify-center font-bold text-sm">
                WMK
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#B99A5B] block">
                  Institutional Trade Confirmation
                </span>
                <h2 className="text-xl font-bold text-[#10243A] tracking-tight">
                  {contract.arbitration === 'GAFTA 119'
                    ? 'GAFTA CONTRACT FORM NO. 119'
                    : contract.arbitration === 'FOSFA 54'
                    ? 'FOSFA CONTRACT FORM NO. 54'
                    : 'INTERNATIONAL COMMODITY CONTRACT'}
                </h2>
              </div>
            </div>
            <p className="text-[11px] text-[#64748B] mt-1">
              General Contract for Bulk Physical Agricultural / Industrial Commodities
            </p>
          </div>

          <div className="text-right sm:text-right text-xs">
            <div className="font-mono font-bold text-[#10243A]">{contract.tradeRef}</div>
            <div className="text-[#64748B]">Date: {contract.tradeDate}</div>
            <div className="text-[10px] text-[#B99A5B] font-semibold uppercase">
              Doc ID: {contract.id}
            </div>
          </div>
        </div>

        {/* Contract Parties & Terms Table */}
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-[#CBD5E1] p-3.5 bg-[#FAFBFD]">
              <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold block">
                Sellers (Party 1)
              </span>
              <div className="font-bold text-[#10243A] mt-1">WMK Merchant Capital AG</div>
              <div className="text-[#64748B] text-[11px]">
                Commodities &amp; Bulk Trade Division<br />
                Rue du Rhône 42, 1204 Geneva, Switzerland<br />
                LEI: 549300WMKCORP001923
              </div>
            </div>

            <div className="border border-[#CBD5E1] p-3.5 bg-[#FAFBFD]">
              <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold block">
                Buyers (Party 2)
              </span>
              <div className="font-bold text-[#10243A] mt-1">{contract.counterparty}</div>
              <div className="text-[#64748B] text-[11px]">
                Authorized International Procurement Division<br />
                Bilateral Confirmation Entity
              </div>
            </div>
          </div>

          {/* Specific Transaction Clauses */}
          <div className="border border-[#CBD5E1] divide-y divide-[#E2E8F0]">
            <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#64748B] font-medium">1. Commodity Description:</span>
              <span className="sm:col-span-2 font-semibold text-[#10243A]">{contract.commodity}</span>
            </div>

            <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#64748B] font-medium">2. Quality &amp; Grade:</span>
              <span className="sm:col-span-2 text-[#10243A]">
                {contract.grade} — Moisture max {contract.qualitySpecs.moisturePct}%, Foreign matter max{' '}
                {contract.qualitySpecs.foreignMatterPct}%. Inspection by SGS / Bureau Veritas final at loading.
              </span>
            </div>

            <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#64748B] font-medium">3. Quantity &amp; Margin:</span>
              <span className="sm:col-span-2 font-mono font-semibold text-[#10243A] tabular-nums">
                {contract.quantityMT.toLocaleString()} Metric Tons (+/- 5% at Charterers&apos; option)
              </span>
            </div>

            <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#64748B] font-medium">4. Contract Price &amp; Incoterm:</span>
              <span className="sm:col-span-2 font-mono font-bold text-[#10243A] tabular-nums">
                ${contract.unitPriceUSD.toFixed(2)} USD / MT ({contract.incoterm} {contract.originPort.split('(')[0]})
              </span>
            </div>

            <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#64748B] font-medium">5. Total Notional Consideration:</span>
              <span className="sm:col-span-2 font-mono font-bold text-[#B99A5B] tabular-nums text-sm">
                ${contract.totalValueUSD.toLocaleString()} USD
              </span>
            </div>

            <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#64748B] font-medium">6. Shipment / Delivery Window:</span>
              <span className="sm:col-span-2 text-[#10243A]">{contract.deliveryWindow}</span>
            </div>

            <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#64748B] font-medium">7. Payment Conditions:</span>
              <span className="sm:col-span-2 text-[#10243A]">{contract.paymentTerms}</span>
            </div>

            <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#64748B] font-medium">8. Governing Arbitration:</span>
              <span className="sm:col-span-2 text-[#10243A]">
                Any dispute arising out of or under this contract shall be settled by arbitration in accordance
                with the Arbitration Rules No. 125 of The Grain and Feed Trade Association (GAFTA) / FOSFA,
                London.
              </span>
            </div>
          </div>

          {/* Legal Signatures Strip */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-[#CBD5E1]">
            <div className="space-y-6">
              <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-bold block">
                Signed for and on behalf of Sellers:
              </span>
              <div className="h-10 border-b border-[#10243A] flex items-end">
                <span className="font-serif italic text-xs text-[#10243A]">M. de Wendel — Managing Partner</span>
              </div>
              <div className="text-[10px] text-[#64748B]">WMK Merchant Capital AG / Geneva Desk</div>
            </div>

            <div className="space-y-6">
              <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-bold block">
                Signed for and on behalf of Buyers:
              </span>
              <div className="h-10 border-b border-[#10243A] flex items-end">
                <span className="font-serif italic text-xs text-[#10243A]">Duly Authorized Signatory</span>
              </div>
              <div className="text-[10px] text-[#64748B]">{contract.counterparty}</div>
            </div>
          </div>
        </div>

        {/* Modal Controls (Hidden in Print) */}
        <div className="border-t border-[#CBD5E1] pt-4 flex items-center justify-between print:hidden">
          <span className="text-xs text-[#64748B]">
            Official GAFTA Form Confirmation · Serial #{contract.id}
          </span>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="h-10 px-5 bg-[#10243A] hover:bg-[#1E293B] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer border border-[#10243A]"
            >
              Print Confirmation Slip
            </button>
            <button
              onClick={onClose}
              className="h-10 px-5 bg-white border border-[#CBD5E1] hover:bg-[#F4F5F7] text-[#10243A] text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
