<script setup lang="ts">
import { useCurrencyInput, CurrencyInputOptions, CurrencyDisplay } from 'vue-currency-input'
import { defineProps, watch, withDefaults, computed } from 'vue'
import Input from '@/components/ui/input/Input.vue'

interface CurrencyConfig {
  locale: string
  code: string
  autoDecimalDigits: boolean
}

interface Props {
  modelValue: number | null
  currencyConfig?: CurrencyConfig
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  currencyConfig: () => ({
    locale: 'en-US',
    code: 'USD',
    autoDecimalDigits: true,
  }),
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number | null): void
}>()

const currencyInputOptions = computed<CurrencyInputOptions>(() => ({
  locale: props.currencyConfig.locale,
  currency: props.currencyConfig.code,
  currencyDisplay: CurrencyDisplay.hidden,
  autoDecimalDigits: props.currencyConfig.autoDecimalDigits,
  useGrouping: true,
  accounting: false,
}))

const { formattedValue, inputRef, setValue, setOptions, numberValue } = useCurrencyInput(
  currencyInputOptions.value
)

const stripCurrencySymbol = (val: string | null): string => {
  if (!val) return ''
  return val.replace(/[^\d.,-]/g, '').trim()
}

watch(
  () => props.modelValue,
  value => {
    setValue(value)
  }
)

watch(
  () => props.currencyConfig,
  newConfig => {
    setOptions({
      locale: newConfig.locale,
      currency: newConfig.code,
      autoDecimalDigits: newConfig.autoDecimalDigits,
    })
  },
  { deep: true }
)

watch(numberValue, val => {
  emit('update:modelValue', val ?? 0)
})
</script>

<template>
  <Input
    ref="inputRef"
    type="text"
    placeholder="0,00"
    :value="stripCurrencySymbol(formattedValue)"
    class="currency-input"
  />
</template>
