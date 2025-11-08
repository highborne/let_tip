import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BillForm from '@/components/billForm/BillForm.vue'
import { FormSwitchInterface } from '@/lib/types/billFormTypes' // Importe o tipo

vi.mock('vee-validate', () => ({
  useForm: vi.fn(() => ({
    validate: vi.fn(),
    initialValues: {},
  })),
  toTypedSchema: vi.fn((schema) => schema),
}))

vi.mock('lodash', async (importOriginal) => {
  const original = await importOriginal<typeof import('lodash')>()
  
  return {
    ...original,
    debounce: vi.fn((fn) => fn), // Garante que a função seja chamada imediatamente
  }
})

vi.mock('@/components/ui/form', () => ({
  FormField: {
      template: `
          <div>
            <slot :componentField="{ modelValue: 0, onChange: () => {} }"></slot>
          </div>
        `,
  },
  FormItem: { template: '<div><slot/></div>' },
  FormLabel: { template: '<label><slot/></label>' },
  FormControl: { template: '<div><slot/></div>' },
  FormMessage: { template: '<span></span>' },
}));


import { useBillSplitStore } from '@/stores/billSpliteStore'
import { createTestingPinia } from '@pinia/testing'

interface BillFormExposed {
  sliderConfigs: FormSwitchInterface[];
  toggleCurrency: (checked: boolean) => void;
  debouncedUpdateBillValue: (value: number | null) => void;
  currentCurrencyConfig: { value: { locale: string, code: string, autoDecimalDigits: boolean } };
}

describe('BillForm - Funcionalidade: Calculo de Gorjeta', () => {
    let pinia: ReturnType<typeof createTestingPinia>
    let store: ReturnType<typeof useBillSplitStore>
    let exposedSetup: BillFormExposed;

    beforeEach(() => {
        pinia = createTestingPinia({
            createSpy: vi.fn, 
            stubActions: false, 
            initialState: {
                billSplit: { 
                    billStoreState: {
                        billValue: 0.0,
                        tipPercentage: 13,
                        numberOfPeople: 10,
                    },
                    selectedCurrency: { code: 'USD', locale: 'USD', exchangeRateToBRL: 0} 
                }
            }
        })

        mount(BillForm, {
            global: {
                plugins: [pinia],
                stubs: {
                    Switch: true,
                    
                    FormField: true,
                    FormItem: true,
                    FormLabel: true,
                    FormControl: true,
                    FormMessage: true,

                    CurrencySymbol: true,
                    CurrencyInput: true,
                    BillFormSlider: true,
                },
            },
        })

        store = useBillSplitStore()

        ;(store.updateSelectedCurrency as any) = vi.fn((currency) => {
            if (currency === 'USD') {
                store.selectedCurrency = { code: 'USD', locale: 'USD', exchangeRateToBRL: 0 }
            } else if (currency === 'EUR') {
                store.selectedCurrency = {code: 'EUR', locale: 'EUR', exchangeRateToBRL: 0 }
            }
        })

        exposedSetup = (BillForm as any).setup!({}, { expose: () => {} } as any) as BillFormExposed;
    })

  
  it('deve ter 13 como valor inicial para Gorjeta, conforme o código Vue', () => {
      expect(store.billStoreState.tipPercentage).toBe(13)
  })

  it('deve ter 10 como valor inicial para Pessoas, conforme o código Vue', () => {
    expect(store.billStoreState.numberOfPeople).toBe(10)
  })

  it('deve ter a gorjeta configurada para variar de 10% a 20%', () => {
    const tipConfig = exposedSetup.sliderConfigs.find((c: FormSwitchInterface) => c.modelKey === 'tipPercentage')

    expect(tipConfig?.min).toBe(10)
    expect(tipConfig?.max).toBe(20)
  })

  it('deve ter o número de pessoas configurado para variar de 2 a 16', () => {
    const peopleConfig = exposedSetup.sliderConfigs.find((c: FormSwitchInterface) => c.modelKey === 'numberOfPeople')
    expect(peopleConfig?.min).toBe(2)
    expect(peopleConfig?.max).toBe(16)
  })

   it('deve alternar para USD quando o switch é ligado (checked: true)', () => {
    const { toggleCurrency } = exposedSetup
    
    toggleCurrency(true)
    expect(store.updateSelectedCurrency).toHaveBeenCalledWith('USD')
    expect(store.selectedCurrency.code).toBe('USD')
  })

  it('deve alternar para EUR quando o switch é desligado (checked: false)', () => {
    const { toggleCurrency } = exposedSetup

    toggleCurrency(false)
    expect(store.updateSelectedCurrency).toHaveBeenCalledWith('EUR')
    expect(store.selectedCurrency.code).toBe('EUR')
  })

  it('deve retornar a configuração correta para USD', () => {
    store.selectedCurrency = { code: 'USD', locale: 'USD', exchangeRateToBRL: 0 }
    const { currentCurrencyConfig } = exposedSetup
    
    expect(currentCurrencyConfig.value.code).toBe('USD')
    expect(currentCurrencyConfig.value.locale).toBe('en-US')
  })
  
  it('deve retornar a configuração correta para EUR', () => {
    store.selectedCurrency = {code: 'EUR', locale: 'EUR', exchangeRateToBRL: 0 }
    const { currentCurrencyConfig } = exposedSetup
    
    expect(currentCurrencyConfig.value.code).toBe('EUR')
    expect(currentCurrencyConfig.value.locale).toBe('de-DE')
  })

  it('deve atualizar o billValue no store quando debouncedUpdateBillValue é chamado', () => {
    exposedSetup.debouncedUpdateBillValue(73.23)
    expect(store.billStoreState.billValue).toBe(73.23)
  })

  it('deve definir billValue como 0 se o valor de entrada for null', () => {
    const { debouncedUpdateBillValue } =  exposedSetup
    
    debouncedUpdateBillValue(null)
    expect(store.billStoreState.billValue).toBe(0)
  })
})