import { Link } from 'react-router-dom'

export default function InfoBar({ links, phonesLink }) {
  return (
    <nav
      aria-label="Информация для пассажиров"
      className="a11y-content flex flex-col gap-4 rounded-md bg-slate-200 px-4 py-4 md:flex-row md:items-center md:justify-between lg:col-span-2"
    >
      <ul className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        {links.map(({ to, title, icon: Icon }) => (
          <li key={to}>
            <Link to={to} className="group flex items-center gap-3 no-underline">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-slate-500 text-white transition-colors group-hover:bg-[var(--color-primary)]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="max-w-64 leading-tight text-[var(--color-primary)] underline underline-offset-2">
                {title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to={phonesLink.to}
        className="text-2xl font-semibold text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-primary-hover)]"
      >
        {phonesLink.title}
      </Link>
    </nav>
  )
}
