import { Link, NavLink } from 'react-router-dom'
import { Mail, Phone, Plane } from 'lucide-react'
import AccessibilitySettings from './AccessibilitySettings.jsx'
import { CONTACTS, emailHref, phoneHref } from '../config/contacts.js'

const actionClass =
  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10'

export default function Header() {
  return (
    <header className="a11y-content bg-[var(--color-primary)] text-white shadow-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white no-underline">
          <Plane className="h-6 w-6" aria-hidden="true" />
          Airport
        </Link>

        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <a href={phoneHref} className={actionClass} aria-label={`Телефон ${CONTACTS.phone}`}>
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span className="hidden lg:inline">{CONTACTS.phone}</span>
          </a>
          <a href={emailHref} className={actionClass} aria-label={`Почта ${CONTACTS.email}`}>
            <Mail className="h-5 w-5" aria-hidden="true" />
            <span className="hidden lg:inline">{CONTACTS.email}</span>
          </a>
          <AccessibilitySettings triggerClassName={`${actionClass} cursor-pointer`} />
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `rounded-md border border-white/60 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[var(--color-primary)] ${
                isActive ? 'bg-white/15' : ''
              }`
            }
          >
            Контакты
          </NavLink>
        </div>
      </div>
    </header>
  )
}
