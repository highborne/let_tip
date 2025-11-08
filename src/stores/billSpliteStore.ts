import { defineStore } from 'pinia'
import { ref, computed, reactive, watch } from 'vue'
import _ from 'lodash'

import { getExchangeRateToBRL } from '@/services/convertCurrencyService'
import { BillSplitResultInterface, BillInitialInterface } from '@/lib/types/commonTypes'
import { CURRENCY_MAP, CurrencyState, type CurrencyType } from '@/lib/currency'

export const useBillSplitStore = defineStore('billSplit', () => {
  const selectedCurrency = ref<CurrencyState>({
    code: 'USD',
    locale: 'en-US',
    exchangeRateToBRL: 0,
  })
  const billStoreState = reactive<BillInitialInterface>({
    billValue: 0,
    tipPercentage: 10,
    numberOfPeople: 2,
  })

  const isLoadingExchangeRate = ref(false)
  const exchangeRateError = ref<string | null>(null)

  const currencySymbol = computed(() => {
    const currency = selectedCurrency.value.code
    if (!(currency in CURRENCY_MAP)) {
      return '?'
    }

    return CURRENCY_MAP[currency].symbol
  })

  const updateSelectedCurrency = (currencyCode: CurrencyType) => {
    selectedCurrency.value.code = currencyCode
  }

  const updateBillState = (key: keyof BillInitialInterface, value: number) => {
    (billStoreState[key] as number) = value
  }

  const fetchAndSetExchangeRate = async (currencyCode: CurrencyType) => {
    isLoadingExchangeRate.value = true
    exchangeRateError.value = null

    try {
      const rate = await getExchangeRateToBRL(currencyCode)

      selectedCurrency.value.exchangeRateToBRL = rate
    } catch (error) {
      exchangeRateError.value = (error as Error).message || 'Erro ao carregar câmbio.'
      selectedCurrency.value.exchangeRateToBRL = 0
    } finally {
      isLoadingExchangeRate.value = false
    }
  }

  const debouncedFetchExchangeRate = _.debounce(fetchAndSetExchangeRate, 500)

  watch(
    () => selectedCurrency.value.code,
    newCurrencyCode => {
      debouncedFetchExchangeRate(newCurrencyCode)
    },
    { deep: true, immediate: true }
  )

  const billSplitResult = computed<BillSplitResultInterface>(() => {
    const { billValue, tipPercentage, numberOfPeople } = billStoreState

    if (billValue <= 0) {
      return {
        billValue: 0,
        tipValue: 0,
        billPlusTipTotal: 0,
        perPerson: 0,
        perPersonInBRL: 0,
      }
    }

    const conversionRate = selectedCurrency.value.exchangeRateToBRL

    const decimalTipValue = tipPercentage / 100
    const tipValue = billValue * decimalTipValue
    const billPlusTipTotal = billValue + tipValue
    const perPerson = billPlusTipTotal / numberOfPeople
    const perPersonInBRL = perPerson * conversionRate

    return {
      billValue,
      tipValue,
      billPlusTipTotal,
      perPerson,
      perPersonInBRL,
    }
  })

  return {
    selectedCurrency,
    billStoreState,
    billSplitResult,
    currencySymbol,
    updateBillState,
    updateSelectedCurrency,
  }
})
