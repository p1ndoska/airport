import { Accessibility, Armchair, KeyRound, Luggage, SquareParking, Ticket } from 'lucide-react'

export const SERVICE_LINKS = [
  { to: '/tickets', title: 'Купить билет', icon: Ticket },
  { to: '/business-lounge', title: 'Бизнес-зал', icon: Armchair },
  { to: '/baggage', title: 'Багаж', icon: Luggage },
  { to: '/rent', title: 'Аренда', icon: KeyRound },
  { to: '/reduced-mobility', title: 'Маломобильным пассажирам', icon: Accessibility },
  { to: '/parking', title: 'Паркинг', icon: SquareParking },
]
