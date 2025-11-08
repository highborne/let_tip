export interface SplitBillPanelInterface {
  label: string,
  preffix: string,
  currency?: 'USD' | 'EUR' | 'BRL',
  modelKey: 'billValue' | 'tipValue' | 'billPlusTipTotal' | 'perPerson' | 'perPersonInBRL',
}

