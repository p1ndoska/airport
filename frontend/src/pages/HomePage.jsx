import { useEffect, useState } from 'react'
import PhotoCarousel from '../components/PhotoCarousel.jsx'
import QuickLinks from '../components/QuickLinks.jsx'
import FlightBoard from '../components/FlightBoard.jsx'
import ServiceTiles from '../components/ServiceTiles.jsx'
import { CAROUSEL_INTERVAL_MS, CAROUSEL_SLIDES } from '../config/carousel.js'
import { QUICK_LINKS } from '../config/quickLinks.js'
import { SERVICE_LINKS } from '../config/serviceLinks.js'

export default function HomePage() {
  const [status, setStatus] = useState('проверка...')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.db === 'ok' ? 'API и база данных работают' : 'API работает, база недоступна'))
      .catch(() => setStatus('API недоступен'))
  }, [])

  return (
    <>
      <PhotoCarousel slides={CAROUSEL_SLIDES} interval={CAROUSEL_INTERVAL_MS} />
      <QuickLinks links={QUICK_LINKS} />
      <div className="mx-auto grid max-w-page items-start gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <FlightBoard />
        <ServiceTiles links={SERVICE_LINKS} />
      </div>
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-800">Airport</h1>
        <p className="mt-2 text-slate-600">{status}</p>
      </div>
    </>
  )
}
