export interface BillInitialInterface {
  billValue: number
  tipPercentage: number
  numberOfPeople: number
}

export interface ExchangeRatesInterface {
  baseToBRL: number
}

export interface BillSplitResultInterface {
  billValue: number
  tipValue: number
  billPlusTipTotal: number
  perPerson: number
  perPersonInBRL: number
}
