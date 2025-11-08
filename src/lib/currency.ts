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

type ValidCurrencySymbols = typeof CURRENCY_MAP[keyof typeof CURRENCY_MAP]['symbol'];

export type CurrencySymbolType = ValidCurrencySymbols | '?';

export interface CurrencyState {
    code: CurrencyType;
    locale: string;
    exchangeRateToBRL: number;
}

export type CurrencyInfo = typeof CURRENCY_MAP[CurrencyType];