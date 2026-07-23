import { ReactNode } from 'react'

const TICKETS_URL = 'https://filmfreeway.com/VeronaVISF/tickets'

interface BuyTicketsButtonProps {
  className?: string
  children?: ReactNode
}

export default function BuyTicketsButton({ className, children }: BuyTicketsButtonProps) {
  return (
    <a href={TICKETS_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children ?? 'TICKETS'}
    </a>
  )
}