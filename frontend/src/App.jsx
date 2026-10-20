import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import ContactsPage from './pages/ContactsPage.jsx'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Header />
      <main className="a11y-content flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
