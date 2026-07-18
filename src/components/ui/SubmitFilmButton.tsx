import { ReactNode } from 'react'

const FILMFREEWAY_URL = 'https://filmfreeway.com/VeronaVISF'

interface SubmitFilmButtonProps {
  className?: string
  children?: ReactNode
}

export default function SubmitFilmButton({ className, children }: SubmitFilmButtonProps) {
  return (
    <a href={FILMFREEWAY_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children ?? 'SUBMIT YOUR FILM'}
    </a>
  )
}
