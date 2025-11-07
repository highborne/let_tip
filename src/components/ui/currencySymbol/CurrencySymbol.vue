<script setup lang="ts">
import { CurrencySymbolType } from '@/lib/types/commonTypes';

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
    class="bill-switch__label" 
    :class="[props.sizeClass]"
  >
    {{ props.symbol }}
  </span>
</template>