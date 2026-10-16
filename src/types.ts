export type Incoterm = 'FOB' | 'CIF' | 'CFR' | 'DAP';

export type ContractStatus = 'settled' | 'pending' | 'in_transit' | 'contracted';

export type CommoditySector = 'Grains & Oilseeds' | 'Industrial Metals' | 'Energy & Petrochem' | 'Fertilizers';

export interface QualitySpecs {
  moisturePct: number;
  proteinPct?: number;
  testWeightKgHl?: number;
  foreignMatterPct: number;
  purityPct?: number;
}

export interface CommodityContract {
  id: string;
  tradeRef: string;
  commodity: string;
  sector: CommoditySector;
  grade: string;
  originPort: string;
  destinationPort: string;
  incoterm: Incoterm;
  quantityMT: number;
  unitPriceUSD: number;
  totalValueUSD: number;
  counterparty: string;
  status: ContractStatus;
  tradeDate: string;
  deliveryWindow: string;
  qualitySpecs: QualitySpecs;
  arbitration: 'GAFTA 119' | 'FOSFA 54' | 'Incoterms 2020';
  paymentTerms: string;
}

export interface VesselVoyage {
  id: string;
  vesselName: string;
  imoNumber: string;
  vesselClass: 'Panamax' | 'Capesize' | 'Supramax' | 'Handymax';
  flag: string;
  cargoType: string;
  tonnageMT: number;
  originPort: string;
  destinationPort: string;
  speedKnots: number;
  eta: string;
  draftMeters: number;
  demurrageDailyRateUSD: number;
  status: 'underway' | 'loading' | 'berthed' | 'discharging' | 'anchorage';
  billOfLadingRef: string;
  coordinates: string;
  daysToPort: number;
  bunkerConsumptionMTDay: number;
}

export interface StorageCommodity {
  name: string;
  stockMT: number;
  certifiedGrade: string;
  moisturePct: number;
}

export interface StorageFacility {
  id: string;
  facilityName: string;
  facilityType: 'Grain Silo Complex' | 'Deepwater Terminal' | 'Petrochemical Tank Farm' | 'Bonded Warehouse';
  location: string;
  totalCapacityMT: number;
  currentStockMT: number;
  utilizationPct: number;
  commoditiesStored: StorageCommodity[];
  temperatureC: number;
  humidityPct: number;
  lastInspectionDate: string;
  berthDepthMeters: number;
  inspectorName: string;
}

export interface SettlementAgreement {
  id: string;
  contractRef: string;
  counterparty: string;
  commodity: string;
  issuingBank: string;
  lcNumber: string;
  lcAmountUSD: number;
  collateralMarginPct: number;
  paymentTerms: string;
  status: 'verified' | 'escrow_funded' | 'released' | 'pending_docs';
  arbitrationRules: 'GAFTA 119' | 'FOSFA 54' | 'Incoterms 2020';
  issueDate: string;
  maturityDate: string;
}

export interface MarketQuote {
  symbol: string;
  name: string;
  sector: CommoditySector;
  spotPrice: number;
  change24h: number;
  change24hPct: number;
  high24h: number;
  low24h: number;
  volumeMT: number;
  unit: string;
}
