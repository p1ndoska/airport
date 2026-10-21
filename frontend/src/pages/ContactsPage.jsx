import { CONTACTS, emailHref, phoneHref } from '../config/contacts.js'

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-page px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800">Контакты</h1>
      <dl className="mt-6 space-y-3 text-lg text-slate-700">
        <div>
          <dt className="font-semibold">Телефон</dt>
          <dd>
            <a href={phoneHref} className="text-[var(--color-primary)] hover:underline">
              {CONTACTS.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Почта</dt>
          <dd>
            <a href={emailHref} className="text-[var(--color-primary)] hover:underline">
              {CONTACTS.email}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  )
}
