import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('проверка...')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.db === 'ok' ? 'API и база данных работают' : 'API работает, база недоступна'))
      .catch(() => setStatus('API недоступен'))
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="rounded-xl bg-white p-8 shadow text-center">
        <h1 className="text-2xl font-bold text-slate-800">Airport</h1>
        <p className="mt-2 text-slate-600">{status}</p>
      </div>
    </main>
  )
}

export default App
