import React, { useState } from 'react';
import { SettlementAgreement, CommodityContract } from '../types.ts';

interface SettlementLedgerProps {
  settlements: SettlementAgreement[];
  contracts: CommodityContract[];
  onSettleAgreement: (agreementId: string) => void;
  onViewGaftaSlipByContractRef: (contractRef: string) => void;
}

export const SettlementLedger: React.FC<SettlementLedgerProps> = ({
  settlements,
  onSettleAgreement,
  onViewGaftaSlipByContractRef,
}) => {
  const [filterBank, setFilterBank] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filtered = settlements.filter((s) => {
    const matchesBank = filterBank === 'All' || s.issuingBank.includes(filterBank);
    const matchesStatus = filterStatus === 'All' || s.status === filterStatus;
    return matchesBank && matchesStatus;
  });

  const totalLcVolume = settlements.reduce((sum, s) => sum + s.lcAmountUSD, 0);
  const releasedVolume = settlements
    .filter((s) => s.status === 'released')
    .reduce((sum, s) => sum + s.lcAmountUSD, 0);

  const handleReleaseClick = (id: string, lcNumber: string) => {
    onSettleAgreement(id);
    setSuccessMsg(`Letter of Credit [${lcNumber}] released through banking escrow channel.`);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Feedback banner */}
      {successMsg && (
        <div className="bg-[#FAFBFD] border border-[#B99A5B] p-4 text-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#B99A5B]"></div>
            <span className="font-semibold text-[#10243A]">{successMsg}</span>
          </div>
          <button
            onClick={() => setSuccessMsg(null)}
            className="text-slate-500 hover:text-slate-900 font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Credit Facility Overview Strip */}
      <div className="border border-[#CBD5E1] bg-white p-5">
        <div className="border-b border-[#E2E8F0] pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider text-[#10243A]">
              Syndicated Trade Finance &amp; Documentary Letter of Credit Facility
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Administered under UCP 600, GAFTA Arbitration Rules, and Incoterms 2020
            </p>
          </div>
          <div className="text-[11px] font-mono text-[#64748B] bg-[#F4F5F7] px-3 py-1 border border-[#CBD5E1]">
            Global Facility ID: WMK-SYN-500M-GEN
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4">
          <div className="border border-[#E2E8F0] p-4 bg-[#FAFBFD]">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold block">
              Total Credit Line
            </span>
            <div className="text-xl font-bold text-[#10243A] tabular-nums mt-1">$500,000,000 USD</div>
            <div className="text-[10px] text-[#64748B] mt-0.5">Revolving Syndicate</div>
          </div>

          <div className="border border-[#E2E8F0] p-4 bg-[#FAFBFD]">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold block">
              Active Drawn LC Volume
            </span>
            <div className="text-xl font-bold text-[#10243A] tabular-nums mt-1">
              ${(totalLcVolume / 1000000).toFixed(2)}M USD
            </div>
            <div className="text-[10px] text-[#64748B] mt-0.5">{settlements.length} Active Master LCs</div>
          </div>

          <div className="border border-[#E2E8F0] p-4 bg-[#FAFBFD]">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold block">
              Released &amp; Settled
            </span>
            <div className="text-xl font-bold text-[#B99A5B] tabular-nums mt-1">
              ${(releasedVolume / 1000000).toFixed(2)}M USD
            </div>
            <div className="text-[10px] text-[#64748B] mt-0.5">100% CAD Compliance</div>
          </div>

          <div className="border border-[#E2E8F0] p-4 bg-[#FAFBFD]">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold block">
              Available Headroom
            </span>
            <div className="text-xl font-bold text-emerald-800 tabular-nums mt-1">
              ${((500000000 - totalLcVolume) / 1000000).toFixed(2)}M USD
            </div>
            <div className="text-[10px] text-[#64748B] mt-0.5">Immediate Drawdown</div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="border border-[#E2E8F0] bg-white p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-xs font-semibold text-[#10243A] uppercase tracking-wider">
            Filter Ledger:
          </div>

          <select
            value={filterBank}
            onChange={(e) => setFilterBank(e.target.value)}
            className="h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] font-medium focus:outline-none focus:border-[#10243A] cursor-pointer"
          >
            <option value="All">All Issuing Banks</option>
            <option value="BNP Paribas">BNP Paribas</option>
            <option value="Bank of China">Bank of China</option>
            <option value="Rabobank">Rabobank</option>
            <option value="Banco Bradesco">Banco Bradesco</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] font-medium uppercase tracking-wider focus:outline-none focus:border-[#10243A] cursor-pointer"
          >
            <option value="All">All LC Statuses</option>
            <option value="verified">Verified</option>
            <option value="escrow_funded">Escrow Funded</option>
            <option value="released">Released / Settled</option>
            <option value="pending_docs">Pending Documents</option>
          </select>
        </div>

        <div className="text-xs text-[#64748B] tabular-nums">
          Showing {filtered.length} of {settlements.length} Trade Agreements
        </div>
      </div>

      {/* Letters of Credit Table */}
      <div className="border border-[#CBD5E1] bg-white overflow-x-auto">
        <div className="bg-[#F4F5F7] px-4 py-3 border-b border-[#CBD5E1] flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#10243A]">
            Bilateral Trade Settlement Ledger &amp; Document Release Status
          </span>
          <span className="text-[11px] text-[#64748B] font-mono">
            SWIFT MT700 / MT799 Direct Link
          </span>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#FAFBFD] border-b border-[#CBD5E1]">
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider">
                LC Number / Contract
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider">
                Issuing Bank &amp; Branch
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider">
                Counterparty &amp; Commodity
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider text-right">
                LC Amount (USD)
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider">
                Arbitration Standard
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider text-center">
                Status
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider text-right">
                Documentary Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <tr
                  key={s.id}
                  className={`border-b border-[#E2E8F0] hover:bg-[#F3F4F6] transition-colors ${
                    isEven ? 'bg-white' : 'bg-[#FAFBFD]'
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-semibold text-[#10243A] whitespace-nowrap">
                    {s.lcNumber}
                    <div className="text-[10px] font-sans text-[#64748B]">{s.contractRef}</div>
                  </td>

                  <td className="py-3 px-4 text-[#10243A]">
                    <div className="font-semibold">{s.issuingBank}</div>
                    <div className="text-[10px] text-[#64748B]">Maturity: {s.maturityDate}</div>
                  </td>

                  <td className="py-3 px-4 max-w-[220px]">
                    <div className="font-medium text-[#10243A] truncate">{s.counterparty}</div>
                    <div className="text-[10px] text-[#64748B] truncate">{s.commodity}</div>
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-[#10243A] tabular-nums whitespace-nowrap">
                    ${s.lcAmountUSD.toLocaleString()}
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-mono text-[11px] text-[#1E293B]">{s.arbitrationRules}</span>
                    <div className="text-[10px] text-[#64748B]">{s.collateralMarginPct}% Collateral Margin</div>
                  </td>

                  {/* Strict WMK Badges */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    {s.status === 'released' && (
                      <span className="inline-block px-2.5 py-1 bg-[#F4F5F7] text-[#10243A] border border-[#B99A5B] text-[10px] font-semibold tracking-wider uppercase">
                        Released
                      </span>
                    )}
                    {s.status === 'verified' && (
                      <span className="inline-block px-2.5 py-1 bg-[#F4F5F7] text-[#10243A] border border-[#B99A5B] text-[10px] font-semibold tracking-wider uppercase">
                        Verified
                      </span>
                    )}
                    {s.status === 'escrow_funded' && (
                      <span className="inline-block px-2.5 py-1 bg-[#F4F5F7] text-[#64748B] border border-[#E2E8F0] text-[10px] font-semibold tracking-wider uppercase">
                        Escrow Funded
                      </span>
                    )}
                    {s.status === 'pending_docs' && (
                      <span className="inline-block px-2.5 py-1 bg-[#F4F5F7] text-amber-800 border border-amber-300 text-[10px] font-semibold tracking-wider uppercase">
                        Pending Docs
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onViewGaftaSlipByContractRef(s.contractRef)}
                        className="px-2.5 py-1 bg-white border border-[#CBD5E1] text-[#10243A] hover:bg-[#F4F5F7] text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Confirmation
                      </button>

                      {s.status !== 'released' && (
                        <button
                          onClick={() => handleReleaseClick(s.id, s.lcNumber)}
                          className="px-2.5 py-1 bg-[#B99A5B] hover:bg-[#a6884c] text-white text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer border border-[#B99A5B]"
                        >
                          Release Escrow
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
