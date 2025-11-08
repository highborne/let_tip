<script setup lang="ts">
import { CurrencySymbolType } from '@/lib/currency';

interface Props {
  symbol: CurrencySymbolType
  sizeClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  sizeClass: 'text-3xl font-medium'
})
</script>

<template>
  <span 
    class="monetary-icon flex items-center justify-center" 
    :class="[props.sizeClass]"
  >
    {{ props.symbol }}
  </span>
</template>