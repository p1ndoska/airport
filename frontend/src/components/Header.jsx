import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Mail, Menu, Phone, Plane, X } from 'lucide-react'
import AccessibilitySettings from './AccessibilitySettings.jsx'
import { CONTACTS, emailHref, phoneHref } from '../config/contacts.js'

const actionClass =
  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10'

const mobileItemClass =
  'flex w-full items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-white transition-colors hover:bg-white/10'

const contactsClass = ({ isActive }) =>
  `rounded-md border border-white/60 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[var(--color-primary)] ${
    isActive ? 'bg-white/15' : ''
  }`

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="a11y-content relative z-40 bg-[var(--color-primary)] text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-white no-underline"
          onClick={() => setMenuOpen(false)}
        >
          <Plane className="h-6 w-6" aria-hidden="true" />
          Аэропорт Брест
        </Link>

        <div className="hidden flex-wrap items-center gap-2 md:flex">
          <a href={phoneHref} className={actionClass} aria-label={`Телефон ${CONTACTS.phone}`}>
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span className="hidden lg:inline">{CONTACTS.phone}</span>
          </a>
          <a href={emailHref} className={actionClass} aria-label={`Почта ${CONTACTS.email}`}>
            <Mail className="h-5 w-5" aria-hidden="true" />
            <span className="hidden lg:inline">{CONTACTS.email}</span>
          </a>
          <AccessibilitySettings triggerClassName={`${actionClass} cursor-pointer`} />
          <NavLink to="/contacts" className={contactsClass}>
            Контакты
          </NavLink>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-white transition-colors hover:bg-white/10 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Меню"
        className={`absolute inset-x-0 top-full border-t border-white/15 bg-[var(--color-primary)] shadow-lg md:hidden ${
          menuOpen ? '' : 'hidden'
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          <a href={phoneHref} className={mobileItemClass}>
            <Phone className="h-5 w-5" aria-hidden="true" />
            {CONTACTS.phone}
          </a>
          <a href={emailHref} className={mobileItemClass}>
            <Mail className="h-5 w-5" aria-hidden="true" />
            {CONTACTS.email}
          </a>
          <AccessibilitySettings
            triggerClassName={`${mobileItemClass} cursor-pointer`}
            labelClassName=""
            onOpen={() => setMenuOpen(false)}
          />
          <NavLink
            to="/contacts"
            className={(state) => `mt-2 text-center ${contactsClass(state)}`}
            onClick={() => setMenuOpen(false)}
          >
            Контакты
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
