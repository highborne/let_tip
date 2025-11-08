<script setup lang="ts">
import { computed } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { billFormSchema, type BillFormSchemaType } from '@/lib/types/billFormSchema'
import { Switch } from '@/components/ui/switch'
import CurrencyInput from '@/components/billForm/components/CurrencyInput.vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form' 
import  BillFormSlider from '@/components/billForm/components/BillFormSlider.vue'
import CurrencySymbol from '@/components/ui/currencySymbol/CurrencySymbol.vue'
import { useForm } from 'vee-validate'
import { useBillSplitStore } from '@/stores/billSpliteStore'
import { FormSwitchInterface, SliderModelKeyType } from '@/lib/types/billFormTypes'
import { storeToRefs } from 'pinia'
import _, { debounce, toNumber } from 'lodash'

const { updateSelectedCurrency } = useBillSplitStore();
const { selectedCurrency, billStoreState, currencySymbol } = storeToRefs(useBillSplitStore());

const isUSD = computed(() => selectedCurrency.value.code === 'USD');
const sliderConfigs: FormSwitchInterface[] = [
  {
    label: "Gorjeta",
    default: 13,
    min: 10,
    max: 20,
    step: 1,
    suffix: "%",
    modelKey: 'tipPercentage',
  },
  {
    label: "Pessoas",
    default: 10,
    min: 2,
    max: 16,
    step: 1,
    suffix: "",
    modelKey: 'numberOfPeople',
  },
];

const validationSchema = toTypedSchema(billFormSchema);
const { validate, handleSubmit } = useForm<BillFormSchemaType>({
    validationSchema,
    initialValues: {
        billValue: billStoreState.value.billValue || 0.00,
    },
});

const updateBillValueInStore = (value: number | null) => {
    billStoreState.value.billValue = value ?? 0;
}
const debouncedUpdateBillValue = debounce(updateBillValueInStore, 300);

const currentCurrencyConfig = computed(() => {
    const code = selectedCurrency.value.code
    
    switch (code) {
      case 'USD':
        return { locale: 'en-US', code, autoDecimalDigits: true }
      case 'EUR':
        return { locale: 'de-DE', code, autoDecimalDigits: true }
      default:
        return { locale: 'pt-BR', code: 'BRL', autoDecimalDigits: true } 
    }
});

const toggleCurrency = (checked: boolean) => {
  const newCurrency = checked ? 'USD' : 'EUR';
  updateSelectedCurrency(newCurrency);
}
</script>

<template>
  <div class="bill flex flex-col gap-10 w-full max-w-xl">
    <div class="bill-switch flex flex-row items-center justify-center gap-3 mb-4">
      <span class="bill-switch__label text-3xl font-medium">EUR</span>

      <div class="bill-switch__core flex items-center">
        <Switch 
          id="currency-switch"
          :modelValue="isUSD" 
          @update:modelValue="toggleCurrency" 
        />
      </div>

      <span class="bill-switch__label text-3xl font-medium">USD</span>
    </div>

    <FormField 
      id="bill_form"
      name="billValue"
      v-slot="{ componentField }" 
      class="bill-form__field"
    >
      <FormItem class="bill-form__item">
        <div class="bill-form__field-row flex items-center justify-center gap-4">
          <FormLabel class="bill-form__label text-2xl font-medium">Valor</FormLabel>

          <FormControl class="bill-form__control">
            <div class="bill-form__control-inner flex items-center">
              <CurrencySymbol 
                :symbol="currencySymbol"
                size-class="text-3xl font-medium pr-1" 
                class="bill-form__currency-symbol"
              />

              <CurrencyInput
                id="bill-value"
                :modelValue="Number(componentField.modelValue) || null"
                :currency-config="currentCurrencyConfig"
                @update:modelValue="(value: number) => {
                  componentField.onChange(value)
                  debouncedUpdateBillValue(value)
                }"
                class="bill-form__input border-black border-2 rounded-none w-48 pl-1 h-14 px-4 py-3 text-3xl font-medium"
              />
            </div>
          </FormControl>
        </div>

        <FormMessage class="bill-form__message" />
      </FormItem>
    </FormField>

    <div class="bill-form__sliders flex flex-col w-full gap-10 mb-6">
      <BillFormSlider 
        v-for="config in sliderConfigs"
        :key="config.modelKey"
        :config="config"
        :modelValue="billStoreState[config.modelKey]"
        class="bill-form__slider"
      />
    </div>
  </div>
</template>
