import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlaneLanding, PlaneTakeoff, RefreshCw } from 'lucide-react'

const TABS = [
  { id: 'departures', label: 'Вылет', icon: PlaneTakeoff, cityColumn: 'Назначение' },
  { id: 'arrivals', label: 'Прилет', icon: PlaneLanding, cityColumn: 'Пункт вылета' },
]

const COLUMNS = [
  { key: 'flight', label: 'Рейс' },
  { key: 'city', label: null },
  { key: 'scheduled', label: 'По расписанию' },
  { key: 'estimated', label: 'Расчетное' },
  { key: 'sector', label: 'Сектор' },
  { key: 'status', label: 'Статус' },
]

export default function FlightBoard({ departures = [], arrivals = [], onRefresh }) {
  const [activeTab, setActiveTab] = useState('departures')
  const tab = TABS.find((t) => t.id === activeTab)
  const flights = activeTab === 'departures' ? departures : arrivals

  return (
    <section aria-labelledby="flight-board-title" className="a11y-content mx-auto max-w-page px-4 py-8">
      <h2
        id="flight-board-title"
        className="flex items-center gap-3 rounded-t-md bg-[var(--color-primary)] px-4 py-3 text-xl font-semibold text-white"
      >
        <PlaneTakeoff className="h-6 w-6 shrink-0" aria-hidden="true" />
        Онлайн-табло рейсов
      </h2>

      <div className="rounded-b-md bg-[#475562] text-white">
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
                    selected ? 'bg-[#eb7501] text-slate-900' : 'bg-[#323b44] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`h-7 w-7 ${selected ? 'text-white' : 'text-[#eb7501]'}`} aria-hidden="true" />
                  {label}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            className="flex cursor-pointer items-center gap-1 px-2 py-2 text-sm text-slate-300 hover:text-white sm:ml-8"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Обновить
          </button>

          <Link to="/schedule" className="ml-auto px-2 py-2 text-lg font-bold text-white underline hover:text-slate-200">
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
              <tr className="text-[#8fb3d9]">
                {COLUMNS.map(({ key, label }) => (
                  <th key={key} scope="col" className="px-4 py-2 font-normal">
                    {label ?? tab.cityColumn}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={`${flight.flight}-${flight.scheduled}`} className="border-t border-white/10">
                  {COLUMNS.map(({ key }) => (
                    <td key={key} className="px-4 py-3">
                      {flight[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {flights.length === 0 && (
          <p className="border-t border-white/10 px-4 py-10 text-center text-sm text-slate-300">Нет данных о рейсах</p>
        )}
      </div>
    </section>
  )
}
