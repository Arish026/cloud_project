
export interface ZakatCalculation {
  earnings: number;
  nisab: number;
  isApplicable: boolean;
  zakatAmount: number;
  currency: string;
}

export interface IslamicNote {
  content: string;
  reference?: string;
}

export interface GoldPrice {
  pricePerGram: number;
  currency: string;
  lastUpdated: string;
}
