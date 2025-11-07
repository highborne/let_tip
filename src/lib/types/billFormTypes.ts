export interface FormSwitchInterface {
  label: string,
  default: number,
  min: number,
  max: number,
  step?: number, 
  suffix?: string,
  modelKey: 'tipPercentage' | 'numberOfPeople',
}