import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, MapPin, Plane, PlaneLanding, PlaneTakeoff, RefreshCw, SquareArrowUpRight } from 'lucide-react'

const TABS = [
  { id: 'departures', label: 'Вылет', icon: PlaneTakeoff, cityColumn: 'Куда' },
  { id: 'arrivals', label: 'Прилет', icon: PlaneLanding, cityColumn: 'Откуда' },
]

const COLUMNS = [
  { key: 'time', label: 'Время', icon: CalendarDays },
  { key: 'city', label: null, icon: MapPin },
  { key: 'airline', label: 'Авиакомпания, рейс', icon: Plane },
  { key: 'terminal', label: 'Терминал', icon: SquareArrowUpRight },
]

function airlineInitials(name) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function renderCell(key, flight) {
  if (key === 'airline') {
    return (
      <span className="flex items-center gap-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-primary)] text-[0.65rem] font-bold text-[var(--color-primary)]"
          aria-hidden="true"
        >
          {airlineInitials(flight.airline)}
        </span>
        <span>
          {flight.airline}, <span className="font-medium text-[var(--color-primary)]">{flight.flight}</span>
        </span>
      </span>
    )
  }
  return flight[key] || '–'
}

export default function FlightBoard({ departures = [], arrivals = [], onRefresh }) {
  const [activeTab, setActiveTab] = useState('departures')
  const tab = TABS.find((t) => t.id === activeTab)
  const flights = activeTab === 'departures' ? departures : arrivals

  return (
    <section aria-labelledby="flight-board-title" className="a11y-content min-w-0">
      <h2
        id="flight-board-title"
        className="flex items-center gap-3 rounded-t-md bg-[var(--color-primary)] px-4 py-3 text-xl font-semibold text-white"
      >
        <PlaneTakeoff className="h-6 w-6 shrink-0" aria-hidden="true" />
        Онлайн-табло рейсов
      </h2>

      <div className="rounded-b-md border border-t-0 border-slate-200 bg-white text-slate-800">
        <div className="flex flex-wrap items-center gap-2 p-3 sm:gap-4">
          <div role="tablist" aria-label="Тип рейсов" className="flex gap-2">
            {TABS.map(({ id, label, icon: Icon }) => {
              const selected = id === activeTab
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`flight-tab-${id}`}
                  aria-selected={selected}
                  aria-controls="flight-board-panel"
                  onClick={() => setActiveTab(id)}
                  className={`flex cursor-pointer items-center gap-2 rounded-sm px-4 py-2 text-lg font-medium transition-colors sm:gap-3 sm:px-6 sm:text-xl ${
                    selected
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-slate-100 text-[var(--color-primary)] hover:bg-slate-200'
                  }`}
                >
                  <Icon className={`h-7 w-7 ${selected ? 'text-white' : 'text-[var(--color-primary)]'}`} aria-hidden="true" />
                  {label}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            className="flex cursor-pointer items-center gap-1 px-2 py-2 text-sm text-slate-500 hover:text-[var(--color-primary)] sm:ml-8"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Обновить
          </button>

          <Link to="/schedule" className="ml-auto px-2 py-2 text-lg font-bold text-[var(--color-primary)] underline hover:text-[var(--color-primary-hover)]">
            Расписание
          </Link>
        </div>

        <div
          id="flight-board-panel"
          role="tabpanel"
          aria-labelledby={`flight-tab-${activeTab}`}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-100">
                {COLUMNS.map(({ key, label, icon: Icon }) => (
                  <th key={key} scope="col" className="px-4 py-3 font-medium text-[var(--color-primary)]">
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {label ?? tab.cityColumn}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={`${flight.flight}-${flight.time}`} className="border-t border-slate-200">
                  {COLUMNS.map(({ key }) => (
                    <td key={key} className="px-4 py-3">
                      {renderCell(key, flight)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {flights.length === 0 && (
          <p className="border-t border-slate-200 px-4 py-10 text-center text-sm text-slate-400">Нет данных о рейсах</p>
        )}
      </div>
    </section>
  )
}
