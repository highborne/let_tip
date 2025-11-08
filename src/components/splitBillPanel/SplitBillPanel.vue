<script setup>
import { storeToRefs } from 'pinia'
import { useBillSplitStore } from '@/stores/billSpliteStore'
import SplitBillPanelField from '@/components/splitBillPanel/components/SplitBillPanelField.vue'

const billSplitStore = useBillSplitStore()
const { billSplitResult, selectedCurrency } = storeToRefs(billSplitStore)

const fieldsConfigs = [
    {
        label: "Conta",
        modelKey: 'billValue',
    },
    {
        label: "Gorjeta",
        modelKey: 'tipValue',
    },
    {
        label: "Total",
        modelKey: 'billPlusTipTotal',
    },
    {
        label: "Por Pessoa",
        modelKey: 'perPerson',
    },
    {
        label: "em R$",
        modelKey: 'perPersonInBRL',
        currency: 'BRL',
    },
];
</script>

<template>
  <div class="split-bill-panel flex flex-col items-center gap-6 p-6 max-w-4xl">
    <div class="split-bill-panel__list w-full flex flex-col gap-4">
      <SplitBillPanelField
        v-for="field in fieldsConfigs"
        :key="field.modelKey"
        :config="field"
        :value="billSplitResult[field.modelKey]"
        :global-currency="selectedCurrency?.code || 'USD'"
        :class="[
          'split-bill-panel__field',
          { 'split-bill-panel__field--currency': field.currency },
        ]"
      />
    </div>
  </div>
</template>
