import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CalendarDays, Tag } from 'lucide-react'
import { fetchJson, formatNewsDateLong, getNewsImageUrl } from '../utils/news.js'
import { TEST_NEWS } from '../config/testNews.js'

export default function NewsDetailPage() {
  const { id } = useParams()
  const [state, setState] = useState({ id: null, news: null, error: false })
  const testNews = TEST_NEWS.find((item) => item.id === id)
  const loading = !testNews && state.id !== id

  useEffect(() => {
    if (testNews) return
    fetchJson(`/api/news/${id}`)
      .then((news) => setState({ id, news, error: false }))
      .catch(() => setState({ id, news: null, error: true }))
  }, [id, testNews])

  const news = testNews ?? state.news
  const error = !testNews && state.error
  const imageUrl = getNewsImageUrl(news?.photo)

  return (
    <div className="mx-auto max-w-page px-4 py-10">
      <Link to="/news" className="text-sm text-[var(--color-primary)] underline">
        ‹ Все новости
      </Link>
      {loading ? (
        <p className="mt-4 text-slate-600">Загрузка…</p>
      ) : error ? (
        <p className="mt-4 text-slate-600">Новость не найдена</p>
      ) : (
        <article className="mt-4 rounded-md bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold leading-tight text-[var(--color-primary)] sm:text-4xl">{news.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <time dateTime={news.createdAt}>{formatNewsDateLong(news.createdAt)}</time>
            </span>
            {news.category && (
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" aria-hidden="true" />
                <span className="rounded-full bg-[var(--color-primary)] px-2.5 py-0.5 text-xs font-medium text-white">
                  {news.category}
                </span>
              </span>
            )}
          </div>
          {imageUrl && <img src={imageUrl} alt={news.name} className="mt-6 max-h-[28rem] w-full rounded-md object-cover" />}
          <div className="mt-6 space-y-4 leading-relaxed text-slate-700">
            {(news.content ?? '').split(/\n\s*\n/).map((paragraph, index) => (
              <p key={index} className="indent-8">{paragraph}</p>
            ))}
          </div>
        </article>
      )}
    </div>
  )
}
