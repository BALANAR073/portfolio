import type { FormEvent } from 'react'
import { useToast } from './Toast'

/** Отправка формы-заявки: в демо показываем уведомление и очищаем поля.
 *  В реальном проекте здесь будет запрос на сервер или в Telegram-бота. */
export function useSubmit(message: string) {
  const toast = useToast()
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast(message)
    e.currentTarget.reset()
  }
}
