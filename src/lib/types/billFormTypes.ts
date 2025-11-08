export type SliderModelKeyType = 'tipPercentage' | 'numberOfPeople';

export interface FormSwitchInterface {
  label: string,
  default: number,
  min: number,
  max: number,
  step?: number, 
  suffix?: string,
  modelKey: SliderModelKeyType,
}
