import { FormSwitchInterface } from '@/lib/types/billFormTypes'

export const TIP_SETTINGS = {
  MIN_PERCENT: 10,
  MAX_PERCENT: 20,
  DEFAULT_PERCENT: 10,
  LABEL: 'Gorjeta',
  SIMBOL: '%',
}

export const PEOPLE_SETTINGS = {
  MIN_COUNT: 2,
  MAX_COUNT: 16,
  DEFAULT_COUNT: 2,
  LABEL: 'Pessoas',
}

export const SLIDER_CONFIGS: FormSwitchInterface[] = [
  {
    label: 'Gorjeta',
    default: 10, 
    min: 10,
    max: 20,
    step: 1,
    suffix: '%',
    modelKey: 'tipPercentage',
  },
  {
    label: 'Pessoas',
    default: 2, 
    min: 2,
    max: 16,
    step: 1,
    suffix: '',
    modelKey: 'numberOfPeople',
  },
]