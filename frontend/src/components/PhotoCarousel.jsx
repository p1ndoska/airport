import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { useAccessibility } from '../contexts/useAccessibility.js'

const SWIPE_THRESHOLD_PX = 50

function Slide({ slide, active }) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      aria-hidden={!active}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-slate-600 text-white">
        <ImageOff className="h-10 w-10 opacity-70" aria-hidden="true" />
          <span className="text-lg font-medium">{slide.alt}</span>
          <span className="text-sm opacity-70">{slide.src}</span>
        </div>
      ) : (
        <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover" onError={() => setFailed(true)} />
      )}
    </div>
  )
}

export default function PhotoCarousel({ slides, interval = 5000 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(null)
  const { isAccessibilityMode, settings } = useAccessibility()
  const autoplay = slides.length > 1 && !paused && !(isAccessibilityMode && settings.reduceMotion)

  const goTo = useCallback((i) => setIndex((i + slides.length) % slides.length), [slides.length])
  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    if (!autoplay) return undefined
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [autoplay, interval, next, index])

  if (slides.length === 0) return null

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx > SWIPE_THRESHOLD_PX) prev()
    if (dx < -SWIPE_THRESHOLD_PX) next()
    touchStartX.current = null
  }

  const arrowClass =
    'absolute top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60'

  return (
    <section
      className="a11y-content relative mx-auto h-56 w-full max-w-page overflow-hidden bg-slate-300 sm:h-80 lg:h-[28rem]"
      aria-roledescription="карусель"
      aria-label="Фотографии"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, i) => (
        <Slide key={slide.src} slide={slide} active={i === index} />
      ))}

      {slides.length > 1 && (
        <>
          <button type="button" onClick={prev} className={`${arrowClass} left-3`} aria-label="Предыдущее фото">
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button type="button" onClick={next} className={`${arrowClass} right-3`} aria-label="Следующее фото">
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/80'}`}
                aria-label={`Фото ${i + 1} из ${slides.length}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
