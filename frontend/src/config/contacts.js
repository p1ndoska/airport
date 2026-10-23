export const CONTACTS = {
  phone: '+375 (17) 000-00-00',
  email: 'info@airport.by',
  fax: '+375 (17) 213-41-63',
  address: 'г. Минск, ул. Короткевича, 19',
  workingHours: 'Пн-Пт 8:00-17:00',
  companyName: 'РУП «Белаэронавигация»',
}

export const phoneHref = `tel:${CONTACTS.phone.replace(/[^\d+]/g, '')}`
export const emailHref = `mailto:${CONTACTS.email}`
