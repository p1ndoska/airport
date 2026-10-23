import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { CONTACTS, emailHref, phoneHref } from '../config/contacts.js'

const USEFUL_LINKS = [
  { to: '/about', label: 'О предприятии' },
  { to: '/about/vacancies', label: 'Открытые вакансии' },
  { to: '/contacts', label: 'Контакты' },
  { to: '/cookie-policy', label: 'Политика использования cookie' },
]

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="a11y-content bg-[var(--color-primary)] px-4 py-8 text-white">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Контакты</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Phone className="mr-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <a href={phoneHref} className="text-white no-underline hover:underline">
                {CONTACTS.phone}
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{CONTACTS.fax} (факс)</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <a href={emailHref} className="text-white no-underline hover:underline">
                {CONTACTS.email}
              </a>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Адрес: {CONTACTS.address}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-3.5 w-3.5 shrink-0 opacity-0" aria-hidden="true" />
              <span>Время работы: {CONTACTS.workingHours}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Полезные ссылки</h3>
          <ul className="space-y-2 text-sm">
            {USEFUL_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-white no-underline transition-colors hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center md:col-span-3">
          <p className="text-sm">
            © {CURRENT_YEAR} {CONTACTS.companyName}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
