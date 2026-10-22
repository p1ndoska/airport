import { Link } from 'react-router-dom'

export default function ServiceTiles({ links }) {
  return (
    <nav aria-label="Услуги для пассажиров" className="a11y-content rounded-md border border-slate-200 bg-white p-2">
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2">
        {links.map(({ to, title, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="group flex h-full flex-col items-center gap-3 rounded-md px-2 py-5 text-center no-underline transition-colors hover:bg-slate-100"
            >
              <Icon className="h-16 w-16 text-slate-500 transition-colors group-hover:text-[var(--color-primary)]" strokeWidth={1.5} aria-hidden="true" />
              <span className="font-semibold leading-tight text-[var(--color-primary)] underline underline-offset-2">{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
