import { Link } from 'react-router-dom'

export default function QuickLinks({ links }) {
  return (
    <nav aria-label="Разделы сайта" className="a11y-content border-b border-slate-200 bg-white">
      <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-2 px-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {links.map(({ to, title, subtitle, icon: Icon }) => (
          <li key={to} className="flex justify-start lg:justify-center">
            <Link
              to={to}
              className="group flex items-center gap-3 rounded-md p-2 no-underline transition-colors hover:bg-slate-100"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[var(--color-primary)] text-white transition-colors group-hover:bg-[var(--color-primary-hover)]">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-lg font-semibold leading-tight text-[var(--color-primary)]">{title}</span>
                <span className="text-xs text-slate-500">{subtitle}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
