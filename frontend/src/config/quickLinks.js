import { Camera, Car, Luggage, MapPinned, PlaneTakeoff } from 'lucide-react'

export const QUICK_LINKS = [
  { to: '/passengers', title: 'Пассажирам', subtitle: 'Подготовка к полету', icon: Luggage },
  { to: '/transport', title: 'Транспорт', subtitle: 'Проезд, парковки', icon: Car },
  { to: '/services', title: 'Услуги', subtitle: 'Карта, инфраструктура', icon: MapPinned },
  { to: '/airport', title: 'Аэропорт', subtitle: 'Общая информация', icon: PlaneTakeoff },
  { to: '/media', title: 'Медиацентр', subtitle: '', icon: Camera },
]
