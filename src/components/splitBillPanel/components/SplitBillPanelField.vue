<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBillSplitStore } from '@/stores/billSpliteStore'
import CurrencySymbol from '@/components/ui/currencySymbol/CurrencySymbol.vue'
import { computed } from 'vue'
import { useCurrencyFormat } from '@/composables/useCurrencyFormat'

interface Props {
  config: {
    label: string
    modelKey: string
    currency?: string
  }
  value: number
  globalCurrency?: string
}

const props = withDefaults(defineProps<Props>(), {
  globalCurrency: 'USD',
})

const { currencySymbol } = storeToRefs(useBillSplitStore())

const effectiveCurrency = computed(() => props.config.currency || props.globalCurrency || 'USD')
const { format } = useCurrencyFormat(effectiveCurrency.value)

const formattedValue = computed(() => format(props.value || 0))
</script>

<template>
  <div class="split-bill-panel-field flex justify-center items-center gap-1">
    <div class="split-bill-panel-field__symbol flex items-end">
      <CurrencySymbol
        :symbol="props.config.currency ? 'R$' : currencySymbol"
        size-class="text-3xl font-medium pr-1"
      />
    </div>

    <div class="split-bill-panel-field__content flex flex-col items-center">
      <span class="split-bill-panel-field__label text-lg font-semibold leading-none">
        {{ props.config.label }}
      </span>
      <span class="split-bill-panel-field__value text-3xl font-bold leading-none">
        {{ formattedValue }}
      </span>
    </div>
  </div>
</template>
