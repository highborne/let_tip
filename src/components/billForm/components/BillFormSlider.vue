<script setup lang="ts">
import { Slider } from '@/components/ui/slider'
import { FormSwitchInterface } from '@/lib/types/billFormTypes'
import { useBillSplitStore } from '@/stores/billSpliteStore'

interface Props {
  config: FormSwitchInterface
  modelValue: number
}

const { billStoreState, updateBillState } = useBillSplitStore()

const props = defineProps<Props>()

function updateValue(newValue: number[]) {
  updateBillState(props.config.modelKey, newValue[0])
}
</script>

<template>
  <div class="bill-form-slider switch-component flex flex-col">
    <p class="bill-form-slider__label text-xl colo-red-900">
      {{ props.config.label }}:
      <span class="bill-form-slider__value">{{ billStoreState[props.config.modelKey] }}</span
      >{{ props.config.suffix }}
    </p>

    <div class="bill-form-slider__controls flex gap-1">
      <span class="bill-form-slider__min">{{ props.config.min }}</span>
      <Slider
        class="bill-form-slider__slider"
        :model-value="[modelValue]"
        @update:model-value="updateValue"
        :max="props.config.max"
        :min="props.config.min"
        :step="props.config.step"
      />
      <span class="bill-form-slider__max">{{ props.config.max }}</span>
    </div>
  </div>
</template>
