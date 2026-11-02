import { useScrolled } from './hooks'
import { Jump } from './Jump'

/** Плавающая кнопка внизу экрана на телефоне — появляется после первого экрана */
export function MobileCTA({ to, children }: { to: string; children: React.ReactNode }) {
  const show = useScrolled(typeof window !== 'undefined' ? window.innerHeight * 0.6 : 500)
  return <Jump to={to} className={'ui-mcta' + (show ? ' is-shown' : '')}>{children}</Jump>
}
