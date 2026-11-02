import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'article' | 'section' }

/** Плавное появление блока при прокрутке. */
export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: Props) {
  const C = motion[as]
  return (
    <C
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </C>
  )
}
