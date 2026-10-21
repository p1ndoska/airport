import { PlaneTakeoff } from 'lucide-react'

export default function FlightBoard() {
  return (
    <section aria-labelledby="flight-board-title" className="a11y-content mx-auto max-w-page px-4 py-8">
      <h2
        id="flight-board-title"
        className="flex items-center gap-3 rounded-t-md bg-[var(--color-primary)] px-4 py-3 text-xl font-semibold text-white"
      >
        <PlaneTakeoff className="h-6 w-6 shrink-0" aria-hidden="true" />
        Онлайн-табло рейсов
      </h2>
      <div className="flex min-h-64 items-center justify-center rounded-b-md border border-t-0 border-dashed border-slate-300 bg-white p-6 text-center text-slate-400">
        
      </div>
    </section>
  )
}
