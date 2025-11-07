export const CURRENCY_MAP = {
  EUR: {
    symbol: '€',
    name: 'Euro',
  },
  USD: {
    symbol: '$',
    name: 'Dólar Americano',
  },
  BRL: {
    symbol: 'R$',
    name: 'Real Brasileiro',
  },
} as const;

export type CurrencyType = keyof typeof CURRENCY_MAP; 

export interface CurrencyState {
    code: CurrencyType;
    exchangeRateToBRL: number;
}

export type CurrencySymbolType = typeof CURRENCY_MAP[CurrencyType]['symbol'];

export type CurrencyInfo = typeof CURRENCY_MAP[CurrencyType];