import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fetchJson, formatNewsDate, getNewsExcerpt, getNewsImageUrl } from '../utils/news.js'
import { TEST_NEWS } from '../config/testNews.js'

const NEWS_PER_VIEW = 3

function NewsCard({ news }) {
  const imageUrl = getNewsImageUrl(news.photo)

  return (
    <article className="home-news-card">
      <Link to={`/news/${news.id}`} className="home-news-card__image-link">
        {imageUrl ? (
          <img className="home-news-card__image" src={imageUrl} alt={news.name} />
        ) : (
          <div className="home-news-card__image-fallback" aria-hidden="true" />
        )}
      </Link>
      <div className="home-news-card__content">
        <h3 className="home-news-card__title">
          <Link to={`/news/${news.id}`}>{news.name}</Link>
        </h3>
        <time className="home-news-card__date" dateTime={news.createdAt}>
          {formatNewsDate(news.createdAt)}
        </time>
        <p className="home-news-card__excerpt">{getNewsExcerpt(news.content)}</p>
        <Link to={`/news/${news.id}`} className="home-news-card__link">
          Подробнее <span aria-hidden="true">›</span>
        </Link>
      </div>
    </article>
  )
}

export default function HomeNewsSection() {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [startIndex, setStartIndex] = useState(0)
  const maxStartIndex = Math.max(0, news.length - NEWS_PER_VIEW)

  useEffect(() => {
    fetchJson('/api/news')
      .then((items) => setNews(items.length > 0 ? items : TEST_NEWS))
      .catch(() => setNews(TEST_NEWS))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section className="home-news a11y-content" aria-labelledby="home-news-title">
      <div className="mx-auto max-w-page px-4">
        <div className="home-news__header">
          <h2 id="home-news-title" className="home-news__title">Новости</h2>
          <Link to="/news" className="home-news__all-link">
            Все новости <span aria-hidden="true">›</span>
          </Link>
        </div>
        {isLoading ? (
          <div className="home-news__loading">Загрузка новостей…</div>
        ) : news.length === 0 ? (
          <div className="home-news__loading">Новостей пока нет</div>
        ) : (
          <div className="home-news__carousel">
            <button
              type="button"
              className="home-news__arrow"
              onClick={() => setStartIndex((index) => Math.max(0, index - 1))}
              disabled={startIndex === 0}
              aria-label="Предыдущие новости"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <div className="home-news__cards">
              {news.slice(startIndex, startIndex + NEWS_PER_VIEW).map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
            <button
              type="button"
              className="home-news__arrow"
              onClick={() => setStartIndex((index) => Math.min(maxStartIndex, index + 1))}
              disabled={startIndex >= maxStartIndex}
              aria-label="Следующие новости"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
