import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchJson, formatNewsDate, getNewsExcerpt } from '../utils/news.js'
import { TEST_NEWS } from '../config/testNews.js'

export default function NewsPage() {
  const [news, setNews] = useState(null)

  useEffect(() => {
    fetchJson('/api/news')
      .then((items) => setNews(items.length > 0 ? items : TEST_NEWS))
      .catch(() => setNews(TEST_NEWS))
  }, [])

  return (
    <div className="mx-auto max-w-page px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800">Новости</h1>
      {news === null ? (
        <p className="mt-4 text-slate-600">Загрузка новостей…</p>
      ) : news.length === 0 ? (
        <p className="mt-4 text-slate-600">Новостей пока нет</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {news.map((item) => (
            <li key={item.id} className="rounded-md border border-slate-200 bg-white p-4">
              <Link to={`/news/${item.id}`} className="text-lg font-semibold text-[var(--color-primary)] underline">
                {item.name}
              </Link>
              <p className="text-xs text-slate-500">{formatNewsDate(item.createdAt)}</p>
              <p className="mt-2 text-slate-600">{getNewsExcerpt(item.content, 300)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
