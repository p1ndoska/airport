import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ContactsPage from './pages/ContactsPage.jsx'
import SectionPage from './pages/SectionPage.jsx'
import { QUICK_LINKS } from './config/quickLinks.js'
import { SERVICE_LINKS } from './config/serviceLinks.js'
import { INFO_LINKS, USEFUL_PHONES_LINK } from './config/infoLinks.js'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Header />
      <main className="a11y-content flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/schedule" element={<SectionPage title="Расписание" />} />
          <Route path="/about" element={<SectionPage title="О предприятии" />} />
          <Route path="/about/vacancies" element={<SectionPage title="Открытые вакансии" />} />
          <Route path="/cookie-policy" element={<SectionPage title="Политика использования cookie" />} />
          {[...QUICK_LINKS, ...SERVICE_LINKS, ...INFO_LINKS, USEFUL_PHONES_LINK].map(({ to, title, subtitle }) => (
            <Route key={to} path={to} element={<SectionPage title={title} subtitle={subtitle} />} />
          ))}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
