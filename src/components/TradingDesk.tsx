import React, { useState } from 'react';
import { CommodityContract, CommoditySector, MarketQuote } from '../types.ts';

interface TradingDeskProps {
  contracts: CommodityContract[];
  quotes: MarketQuote[];
  onOpenTradeModal: () => void;
  onViewGaftaSlip: (contract: CommodityContract) => void;
  onSelectContractSpecs: (contract: CommodityContract) => void;
}

export const TradingDesk: React.FC<TradingDeskProps> = ({
  contracts,
  quotes,
  onOpenTradeModal,
  onViewGaftaSlip,
  onSelectContractSpecs,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sectors: (string | CommoditySector)[] = [
    'All',
    'Grains & Oilseeds',
    'Industrial Metals',
    'Fertilizers',
    'Energy & Petrochem',
  ];

  const filteredContracts = contracts.filter((c) => {
    const matchesSector = selectedSector === 'All' || c.sector === selectedSector;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    const matchesSearch =
      searchQuery.trim() === '' ||
      c.tradeRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.originPort.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.destinationPort.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesStatus && matchesSearch;
  });

  const exportCSV = () => {
    const headers = [
      'Trade Ref',
      'Commodity',
      'Grade',
      'Sector',
      'Origin Port',
      'Destination Port',
      'Incoterm',
      'Quantity (MT)',
      'Unit Price (USD)',
      'Total Value (USD)',
      'Counterparty',
      'Status',
      'Trade Date',
      'Delivery Window',
      'Arbitration Rules',
    ];

    const rows = filteredContracts.map((c) => [
      c.tradeRef,
      `"${c.commodity}"`,
      `"${c.grade}"`,
      c.sector,
      `"${c.originPort}"`,
      `"${c.destinationPort}"`,
      c.incoterm,
      c.quantityMT,
      c.unitPriceUSD,
      c.totalValueUSD,
      `"${c.counterparty}"`,
      c.status.toUpperCase(),
      c.tradeDate,
      `"${c.deliveryWindow}"`,
      c.arbitration,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `WMK_Physical_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalFilteredValue = filteredContracts.reduce((sum, c) => sum + c.totalValueUSD, 0);
  const totalFilteredTonnage = filteredContracts.reduce((sum, c) => sum + c.quantityMT, 0);

  return (
    <div className="space-y-6">
      {/* Real-time Market Benchmark Strip */}
      <div className="border border-[#CBD5E1] bg-white">
        <div className="bg-[#F4F5F7] px-4 py-2.5 border-b border-[#CBD5E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#B99A5B]"></div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#10243A]">
              Physical Benchmark Index &amp; Spot Indications
            </span>
          </div>
          <span className="text-[11px] text-[#64748B] tabular-nums">
            Indicative Prices FOB / CIF Basis 2026
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-[#E2E8F0]">
          {quotes.map((q) => {
            const isPos = q.change24h >= 0;
            return (
              <div key={q.symbol} className="p-3.5 bg-white hover:bg-[#FAFBFD] transition-colors">
                <div className="text-[10px] text-[#64748B] uppercase tracking-wider truncate font-medium">
                  {q.symbol}
                </div>
                <div className="text-xs font-semibold text-[#10243A] truncate mt-0.5">
                  {q.name}
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-base font-bold text-[#10243A] tabular-nums">
                    ${q.spotPrice.toFixed(2)}
                  </span>
                  <span
                    className={`text-[11px] font-medium tabular-nums ${
                      isPos ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {isPos ? '+' : ''}
                    {q.change24hPct.toFixed(2)}%
                  </span>
                </div>
                <div className="text-[10px] text-[#64748B] mt-1 tabular-nums">
                  Vol: {(q.volumeMT / 1000).toFixed(0)}k MT
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Bar & Filter Architecture */}
      <div className="border border-[#E2E8F0] bg-white p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Sector Tabs (Functional buttons, non-pill) */}
        <div className="flex flex-wrap items-center gap-1 border border-[#CBD5E1] p-1 bg-[#F4F5F7]">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedSector === sec
                  ? 'bg-[#10243A] text-white'
                  : 'bg-transparent text-[#1E293B] hover:bg-white'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Search & Export Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trade ref, counterparty, port..."
              className="w-full h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] placeholder-slate-400 focus:outline-none focus:border-[#10243A]"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 px-3 bg-white border border-[#CBD5E1] text-xs text-[#1E293B] font-medium uppercase tracking-wider focus:outline-none focus:border-[#10243A] cursor-pointer"
          >
            <option value="All">Status: All</option>
            <option value="settled">Settled</option>
            <option value="in_transit">In Transit</option>
            <option value="pending">Pending</option>
            <option value="contracted">Contracted</option>
          </select>

          <button
            onClick={exportCSV}
            className="h-10 px-4 bg-transparent border border-[#CBD5E1] text-[#10243A] hover:bg-[#F4F5F7] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
          >
            Export CSV
          </button>

          <button
            onClick={onOpenTradeModal}
            className="h-10 px-4 bg-[#10243A] hover:bg-[#1E293B] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border border-[#10243A] whitespace-nowrap"
          >
            + New Trade Order
          </button>
        </div>
      </div>

      {/* Aggregate Volume Header Ledger */}
      <div className="bg-[#FAFBFD] border border-[#E2E8F0] px-4 py-3 flex flex-wrap items-center justify-between text-xs gap-3">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[#64748B] uppercase tracking-wider text-[11px] font-medium">Filtered Contracts: </span>
            <strong className="text-[#10243A] font-bold tabular-nums">{filteredContracts.length} lots</strong>
          </div>
          <div className="h-4 w-px bg-[#CBD5E1]"></div>
          <div>
            <span className="text-[#64748B] uppercase tracking-wider text-[11px] font-medium">Tonnage Volume: </span>
            <strong className="text-[#10243A] font-bold tabular-nums">{totalFilteredTonnage.toLocaleString()} MT</strong>
          </div>
          <div className="h-4 w-px bg-[#CBD5E1]"></div>
          <div>
            <span className="text-[#64748B] uppercase tracking-wider text-[11px] font-medium">Aggregate Notional Value: </span>
            <strong className="text-[#B99A5B] font-bold tabular-nums">${totalFilteredValue.toLocaleString()} USD</strong>
          </div>
        </div>
        <div className="text-[11px] text-[#64748B] uppercase tracking-wider">
          Arbitration: GAFTA 119 / FOSFA 54 / Incoterms 2020 Standard
        </div>
      </div>

      {/* Primary Data Table & Ledger (B2B Core) */}
      <div className="border border-[#CBD5E1] bg-white overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F4F5F7] border-b border-[#CBD5E1]">
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider">
                Trade Ref
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider">
                Commodity &amp; Grade
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider">
                Port Terms (Incoterm)
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider text-right">
                Quantity (MT)
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider text-right">
                Unit Price
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider text-right">
                Total Notional (USD)
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider">
                Counterparty &amp; Bank
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider text-center">
                Status
              </th>
              <th className="py-3 px-4 text-[#10243A] text-[11px] uppercase font-semibold tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-500">
                  <div className="max-w-md mx-auto space-y-3">
                    <p className="text-sm font-semibold text-[#10243A]">No Contracts Match Current Filter</p>
                    <p className="text-xs text-slate-500">
                      Adjust your sector filter or search criteria to view commodity lots.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedSector('All');
                        setSelectedStatus('All');
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 bg-[#10243A] text-white text-xs font-semibold uppercase tracking-wider"
                    >
                      Reset Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredContracts.map((c, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <tr
                    key={c.id}
                    className={`border-b border-[#E2E8F0] transition-colors hover:bg-[#F3F4F6] ${
                      isEven ? 'bg-white' : 'bg-[#FAFBFD]'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-medium text-[#10243A] whitespace-nowrap">
                      {c.tradeRef}
                      <div className="text-[10px] text-[#64748B] font-sans">{c.tradeDate}</div>
                    </td>

                    <td className="py-3 px-4 max-w-[240px]">
                      <div className="font-semibold text-[#10243A] truncate">{c.commodity}</div>
                      <div className="text-[11px] text-[#64748B] truncate">{c.grade}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-medium text-[#1E293B]">
                        <span className="font-bold text-[#10243A]">{c.incoterm}</span>
                        <span className="text-[#64748B]">·</span>
                        <span className="truncate">{c.originPort.split('(')[0]}</span>
                      </div>
                      <div className="text-[10px] text-[#64748B] truncate">
                        Dest: {c.destinationPort}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-semibold text-[#10243A] tabular-nums whitespace-nowrap">
                      {c.quantityMT.toLocaleString()} MT
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-[#1E293B] tabular-nums whitespace-nowrap">
                      ${c.unitPriceUSD.toFixed(2)}
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-[#10243A] tabular-nums whitespace-nowrap">
                      ${c.totalValueUSD.toLocaleString()}
                    </td>

                    <td className="py-3 px-4 max-w-[200px]">
                      <div className="font-medium text-[#10243A] truncate">{c.counterparty}</div>
                      <div className="text-[10px] text-[#64748B] truncate">{c.paymentTerms}</div>
                    </td>

                    {/* Strict WMK Badge Status Geometry: 0px radius, label-sm uppercase */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {c.status === 'settled' && (
                        <span className="inline-block px-2.5 py-1 bg-[#F4F5F7] text-[#10243A] border border-[#B99A5B] text-[10px] font-semibold tracking-wider uppercase">
                          Settled
                        </span>
                      )}
                      {c.status === 'in_transit' && (
                        <span className="inline-block px-2.5 py-1 bg-[#F4F5F7] text-[#64748B] border border-[#E2E8F0] text-[10px] font-semibold tracking-wider uppercase">
                          In Transit
                        </span>
                      )}
                      {c.status === 'pending' && (
                        <span className="inline-block px-2.5 py-1 bg-[#F4F5F7] text-amber-800 border border-amber-300 text-[10px] font-semibold tracking-wider uppercase">
                          Pending LC
                        </span>
                      )}
                      {c.status === 'contracted' && (
                        <span className="inline-block px-2.5 py-1 bg-[#F4F5F7] text-[#10243A] border border-[#CBD5E1] text-[10px] font-semibold tracking-wider uppercase">
                          Contracted
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectContractSpecs(c)}
                          className="px-2.5 py-1 bg-white border border-[#CBD5E1] text-[#10243A] hover:bg-[#F4F5F7] text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Specs
                        </button>
                        <button
                          onClick={() => onViewGaftaSlip(c)}
                          className="px-2.5 py-1 bg-[#10243A] hover:bg-[#1E293B] text-white text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          GAFTA Slip
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
