import { Star } from 'lucide-react'

export function Stars({ n = 5, size = 16, className = 'stars' }: { n?: number; size?: number; className?: string }) {
  return (
    <span className={className} aria-label={`Оценка ${n} из 5`}>
      {Array.from({ length: 5 }, (_, i) => <Star key={i} size={size} fill={i < n ? 'currentColor' : 'none'} strokeWidth={1.5} />)}
    </span>
  )
}
