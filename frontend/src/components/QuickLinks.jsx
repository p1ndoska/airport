import { Link } from 'react-router-dom'

export default function QuickLinks({ links }) {
  return (
    <nav aria-label="Разделы сайта" className="a11y-content border-b border-slate-200 bg-white">
      <ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-y-2 px-2 py-4 lg:px-4">
        {links.map(({ to, title, subtitle, icon: Icon }) => (
          <li key={to} className="flex basis-1/2 justify-center sm:basis-1/3 md:basis-1/5">
            <Link
              to={to}
              className="group flex w-full flex-col items-center gap-2 rounded-md p-2 text-center no-underline transition-colors hover:bg-slate-100 lg:w-auto lg:flex-row lg:gap-3 lg:text-left"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[var(--color-primary)] text-white transition-colors group-hover:bg-[var(--color-primary-hover)]">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-lg font-semibold leading-tight text-[var(--color-primary)]">{title}</span>
                {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
