export const CONTACTS = {
  phone: '+375 (17) 000-00-00',
  email: 'info@airport.by',
}

export const phoneHref = `tel:${CONTACTS.phone.replace(/[^\d+]/g, '')}`
export const emailHref = `mailto:${CONTACTS.email}`
