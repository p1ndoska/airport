import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchJson, formatNewsDate, getNewsImageUrl } from '../utils/news.js'

export default function NewsDetailPage() {
  const { id } = useParams()
  const [state, setState] = useState({ id: null, news: null, error: false })
  const loading = state.id !== id

  useEffect(() => {
    fetchJson(`/api/news/${id}`)
      .then((news) => setState({ id, news, error: false }))
      .catch(() => setState({ id, news: null, error: true }))
  }, [id])

  const { news, error } = state
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
        <article className="mt-4">
          <h1 className="text-3xl font-bold text-slate-800">{news.name}</h1>
          <time className="text-sm text-slate-500" dateTime={news.createdAt}>
            {formatNewsDate(news.createdAt)}
          </time>
          {imageUrl && <img src={imageUrl} alt={news.name} className="mt-4 max-h-[28rem] w-full rounded-md object-cover" />}
          <p className="mt-4 whitespace-pre-line text-slate-700">{news.content}</p>
        </article>
      )}
    </div>
  )
}
