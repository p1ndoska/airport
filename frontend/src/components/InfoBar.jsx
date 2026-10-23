import { Link } from 'react-router-dom'

export default function InfoBar({ links, phonesLink }) {
  return (
    <nav
      aria-label="Информация для пассажиров"
      className="a11y-content flex flex-col gap-2 rounded-md border border-slate-200 bg-white p-2 md:flex-row md:items-center md:justify-between lg:col-span-2"
    >
      <ul className="flex flex-col sm:flex-row">
        {links.map(({ to, title, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="group flex h-full items-center gap-3 rounded-md px-3 py-3 no-underline transition-colors hover:bg-slate-100"
            >
              <Icon
                className="h-10 w-10 shrink-0 text-slate-500 transition-colors group-hover:text-[var(--color-primary)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="max-w-64 font-semibold leading-tight text-[var(--color-primary)] underline underline-offset-2">
                {title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to={phonesLink.to}
        className="rounded-md px-3 py-3 text-2xl font-semibold text-[var(--color-primary)] underline underline-offset-4 transition-colors hover:bg-slate-100"
      >
        {phonesLink.title}
      </Link>
    </nav>
  )
}
