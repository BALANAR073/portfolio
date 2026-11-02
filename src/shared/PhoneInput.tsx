import { IMaskInput } from 'react-imask'

type Props = { id?: string; className?: string; required?: boolean; 'aria-label'?: string; placeholder?: string }

/** Поле телефона с маской +7 (___) ___-__-__ */
export function PhoneInput({ placeholder = '+7 (___) ___-__-__', ...p }: Props) {
  return (
    <IMaskInput
      mask="+{7} (000) 000-00-00"
      lazy
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder={placeholder}
      pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}"
      title="Номер в формате +7 (900) 000-00-00"
      {...p}
    />
  )
}
