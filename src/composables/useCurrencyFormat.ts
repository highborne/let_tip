import { ref, computed } from 'vue'

export function useCurrencyFormat(initialCurrency = 'BRL') {
  const currency = ref(initialCurrency)

  const locale = computed(() => {
    switch (currency.value) {
      case 'USD':
        return 'en-US'
      case 'EUR':
        return 'de-DE'
      default:
        return 'pt-BR'
    }
  })

  const formatter = computed(
    () =>
      new Intl.NumberFormat(locale.value, {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
      })
  )

  function format(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') return ''

    const num = typeof value === 'string' ? Number(value.replace(',', '.')) : value

    if (isNaN(num)) return ''

    return formatter.value.format(num)
  }

  function parse(value: string): number {
    if (!value) return 0

    const isUSD = currency.value === 'USD'
    const isEUR = currency.value === 'EUR'
    const isBRL = currency.value === 'BRL'

    let clean = value.replace(/[^\d,.-]/g, '')

    if (isUSD) {
      clean = clean.replace(/,/g, '')
    } else if (isEUR || isBRL) {
      clean = clean.replace(/\./g, '').replace(/,/g, '.')
    }

    const parsed = parseFloat(clean)
    return isNaN(parsed) ? 0 : parsed
  }

  return { currency, format, parse }
}
