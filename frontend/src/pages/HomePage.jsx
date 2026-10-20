import { useEffect, useState } from 'react'

export default function HomePage() {
  const [status, setStatus] = useState('проверка...')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.db === 'ok' ? 'API и база данных работают' : 'API работает, база недоступна'))
      .catch(() => setStatus('API недоступен'))
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800">Airport</h1>
      <p className="mt-2 text-slate-600">{status}</p>
    </div>
  )
}
