import PhotoCarousel from '../components/PhotoCarousel.jsx'
import QuickLinks from '../components/QuickLinks.jsx'
import FlightBoard from '../components/FlightBoard.jsx'
import ServiceTiles from '../components/ServiceTiles.jsx'
import InfoBar from '../components/InfoBar.jsx'
import HomeNewsSection from '../components/HomeNewsSection.jsx'
import { CAROUSEL_INTERVAL_MS, CAROUSEL_SLIDES } from '../config/carousel.js'
import { QUICK_LINKS } from '../config/quickLinks.js'
import { SERVICE_LINKS } from '../config/serviceLinks.js'
import { INFO_LINKS, USEFUL_PHONES_LINK } from '../config/infoLinks.js'

export default function HomePage() {
  return (
    <>
      <PhotoCarousel slides={CAROUSEL_SLIDES} interval={CAROUSEL_INTERVAL_MS} />
      <QuickLinks links={QUICK_LINKS} />
      <div className="mx-auto grid max-w-page items-start gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <FlightBoard />
        <ServiceTiles links={SERVICE_LINKS} />
        <InfoBar links={INFO_LINKS} phonesLink={USEFUL_PHONES_LINK} />
      </div>
      <HomeNewsSection />
    </>
  )
}
